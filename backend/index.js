const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  EmployeeModel,
  AddressModel,
  OrderModel,
  CartModel,
  SavedItemModel,
} = require("./Models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./authentication");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
  })
);

const JWT_SECRET = "Account_Test"; // You can use environment variables to store this securely

mongoose.connect("mongodb://127.0.0.1:27017/Visionsoft");

const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51Q9ZJ7HC7NaQVzOS1SMqmgTvtTKQOgMSp0BlgI7gUCJTsSTRQw4vOvgFWC8WsDAuDwALyyu59DxfsIOGb3z3isJR005xoAmBGN"
);

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Your Product Name",
          },
          unit_amount: 1000, // amount in cents
        },
        quantity: 2,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173/my-orders",
    cancel_url: "http://localhost:5173/",
  });

  res.json({ id: session.id });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User doesn't exist, Register and try Login again!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Password is incorrect." });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "4h",
    });
    return res.json({ message: "Success", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch user data
app.get("/user", authenticateToken, (req, res) => {
  const userId = req.user.id; // Assuming you have a user id in the token
  EmployeeModel.findById(userId)
    .then((user) => {
      if (user) {
        res.json({ name: user.name, email: user.email });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/addresses", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await AddressModel.find({ userId });
    res.json(addresses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addresses", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressLine1, addressLine2, city, state, zipCode } = req.body;

    const newAddress = new AddressModel({
      userId,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
    });

    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/addresses/:id/primary", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    // Unset all other primary addresses
    await AddressModel.updateMany({ userId }, { isPrimary: false });

    // Set the selected address as primary
    const updatedAddress = await AddressModel.findByIdAndUpdate(
      addressId,
      { isPrimary: true },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json(updatedAddress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/addresses/:id", authenticateToken, async (req, res) => {
  try {
    const addressId = req.params.id;
    const deletedAddress = await AddressModel.findByIdAndDelete(addressId);

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/orders", authenticateToken, async (req, res) => {
  const userId = req.user.id; // Extract user ID from the token
  const {
    items,
    total,
    address,
    paymentMethod,
    debitCardDetails,
    checkDetails,
  } = req.body;

  // Validate required fields
  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Cart items are required." });
  }
  if (
    !address ||
    !address.addressLine1 ||
    !address.city ||
    !address.state ||
    !address.zipCode
  ) {
    return res.status(400).json({ error: "Address is required." });
  }
  if (!paymentMethod) {
    return res.status(400).json({ error: "Payment method is required." });
  }

  // Validate payment details based on the payment method
  if (paymentMethod === "debit card") {
    if (
      !debitCardDetails ||
      !debitCardDetails.cardNumber ||
      !debitCardDetails.expiryDate ||
      !debitCardDetails.cvv
    ) {
      return res
        .status(400)
        .json({ error: "Debit card details are required." });
    }
  } else if (paymentMethod === "check") {
    if (!checkDetails || !checkDetails.checkNumber || !checkDetails.bankName) {
      return res.status(400).json({ error: "Check details are required." });
    }
  }

  try {
    const newOrder = new OrderModel({
      userId,
      items,
      total,
      address,
      paymentMethod,
      debitCardDetails:
        paymentMethod === "debit card" ? debitCardDetails : null,
      checkDetails: paymentMethod === "check" ? checkDetails : null,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /orders - Fetch orders for the authenticated user
app.get("/orders", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Corrected to use req.user.id
    const orders = await OrderModel.find({ userId }); // Fetch orders by user ID
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

app.delete("/addresses/:id", authenticateToken, (req, res) => {
  const addressId = req.params.id;
  AddressModel.findByIdAndDelete(addressId)
    .then(() => res.status(204).send())
    .catch((err) => res.status(500).json({ message: "Internal server error" }));
});

app.put("/user", authenticateToken, (req, res) => {
  const userId = req.user.id; // Extract user ID from token
  const { name, email } = req.body; // Get updated name and email from request body

  EmployeeModel.findByIdAndUpdate(userId, { name, email }, { new: true }) // Update user details
    .then((user) => {
      if (user) {
        res.json({
          message: "User updated successfully",
          user: { name: user.name, email: user.email },
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

app.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      EmployeeModel.create({ name, email, password: hash })
        .then((employees) => res.json(employees))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

app.get("/savedItems", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const savedItems = await SavedItemModel.find({ userId });
    res.json({ savedItems });
  } catch (error) {
    console.error("Error fetching saved items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/moveToCart/:productId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    // Get the saved item
    const savedItem = await SavedItemModel.findOne({ userId, productId });
    if (!savedItem) {
      return res.status(404).json({ message: "Saved item not found" });
    }

    // Create cart item
    const cartItem = new CartModel({
      userId,
      productId,
      quantity: 1,
      productName: savedItem.productName,
      category: savedItem.category,
      brand: savedItem.brand,
      price: savedItem.price,
      description: savedItem.description,
      weight: savedItem.weight,
      expirationDate: savedItem.expirationDate,
      image: savedItem.image,
    });

    await cartItem.save();

    // Remove from saved items
    await SavedItemModel.findOneAndDelete({ userId, productId });

    res.json({ message: "Item moved to cart", cartItem });
  } catch (error) {
    console.error("Error moving item to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/savedItems/:productId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const deletedItem = await SavedItemModel.findOneAndDelete({
      userId,
      productId,
    });
    if (!deletedItem) {
      return res.status(404).json({ message: "Saved item not found" });
    }

    res.json({ message: "Saved item deleted", deletedItem });
  } catch (error) {
    console.error("Error deleting saved item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/saveForLater/:productId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    // First, get the item from cart
    const cartItem = await CartModel.findOne({ userId, productId });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Check if item is already saved
    const existingSavedItem = await SavedItemModel.findOne({
      userId,
      productId,
    });
    if (existingSavedItem) {
      return res.status(400).json({ message: "Item already saved" });
    }

    // Create new saved item
    const savedItem = new SavedItemModel({
      userId,
      productId,
      productName: cartItem.productName,
      category: cartItem.category,
      brand: cartItem.brand,
      price: cartItem.price,
      description: cartItem.description,
      weight: cartItem.weight,
      expirationDate: cartItem.expirationDate,
      image: cartItem.image,
    });

    // Save the item
    await savedItem.save();

    // Remove from cart
    await CartModel.findOneAndDelete({ userId, productId });

    res.status(201).json({ message: "Item saved for later", savedItem });
  } catch (error) {
    console.error("Error saving item for later:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/addToCart", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      productId,
      quantity,
      productName,
      category,
      brand,
      price,
      description,
      weight,
      expirationDate,
      image,
    } = req.body;

    // Validate required fields
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ error: "Product ID and quantity are required." });
    }

    // Make sure both userId and productId are properly typed/formatted
    // Use strict comparison in the query
    const existingCartItem = await CartModel.findOne({
      userId: userId.toString(), // Ensure consistent type
      productId: productId.toString(), // Ensure consistent type
    });

    if (existingCartItem) {
      // Update the quantity if the item already exists
      const updatedCartItem = await CartModel.findOneAndUpdate(
        { userId: userId.toString(), productId: productId.toString() },
        { $inc: { quantity: quantity } }, // Use $inc operator to increment quantity
        { new: true } // Return the updated document
      );

      return res
        .status(200)
        .json({ message: "Cart item updated", cartItem: updatedCartItem });
    } else {
      // Add a new item to the cart
      const newCartItem = new CartModel({
        userId: userId.toString(),
        productId: productId.toString(),
        quantity,
        productName,
        category,
        brand,
        price,
        description,
        weight,
        expirationDate,
        image,
      });

      const savedCartItem = await newCartItem.save();
      return res
        .status(201)
        .json({ message: "Product added to cart", cartItem: savedCartItem });
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/cart/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;
    const getItem = await CartModel.findOne({ userId, productId });
    if (!getItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    const deletedCartItem = await CartModel.findOneAndDelete({
      userId,
      productId,
    });
    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.json({ message: "Cart item deleted", cartItem: deletedCartItem });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/cart", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the token
    // Fetch all cart items for the user
    const cartItems = await CartModel.find({ userId });
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "No items in the cart" });
    }

    res.json({ cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3002, () => {
  console.log("3002 Server is running");
});
