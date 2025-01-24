const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  EmployeeModel,
  AddressModel,
  OrderModel,
  CartModel,
  SavedItemModel,
  DistributorModel,
} = require("./Models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isAdmin } = require("./authentication");
const { authenticateToken } = require("./authentication");
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
  try {
    const { lineItems, selectedAddress, userId, cartItems } = req.body;

    // Validate input
    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ message: "Invalid line items" });
    }

    if (!selectedAddress || !selectedAddress._id) {
      return res.status(400).json({ message: "Invalid delivery address" });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`, // Pass session ID to success URL
      cancel_url: `http://localhost:5173/cancel`,
      metadata: {
        userId,
        addressId: selectedAddress._id,
        address: JSON.stringify({
          addressLine1: selectedAddress.addressLine1,
          addressLine2: selectedAddress.addressLine2,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode,
        }),
        cartItems: JSON.stringify(
          cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }))
        ), // Include cart items in metadata
      },
    });

    // Return the session ID to the frontend
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    res.status(500).json({
      message: "Failed to create checkout session",
      error: error.message,
    });
  }
});

// app.post("/confirm-payment", async (req, res) => {
//   try {
//     const { sessionId } = req.body;

//     // Retrieve the Stripe session
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     console.log(session);

//     // Check if the payment was successful
//     if (session.payment_status !== "paid") {
//       console.log("payment not completed");
//       return res.status(400).json({ message: "Payment not completed" });
//     }

//     // Get user details and cart items from metadata
//     const { userId, addressId, address, cartItems } = session.metadata;
//     const parsedAddress = JSON.parse(address);
//     const parsedCartItems = JSON.parse(cartItems);

//     // Create new order
//     const newOrder = new OrderModel({
//       userId,
//       items: parsedCartItems.map((item) => ({
//         product: item.productId, // Match the schema
//         quantity: item.quantity,
//       })),
//       total: (session.amount_total / 100).toFixed(2), // Convert from cents to dollars
//       status: "confirmed",
//       paymentId: session.payment_intent,
//       address: parsedAddress,
//       paymentMethod: "stripe",
//       createdAt: new Date(),
//     });

//     await newOrder.save();

//     // Clear user's cart after successful order
//     await CartModel.deleteMany({ userId });

//     return res
//       .status(200)
//       .json({ message: "Order created successfully", order: newOrder });
//   } catch (error) {
//     console.error("Error confirming payment and creating order:", error);
//     return res.status(500).json({
//       message: "Failed to confirm payment and create order",
//       error: error.message,
//     });
//   }
// });

app.post("/confirm-payment", authenticateToken, async (req, res) => {
  try {
    console.log("confirm payment route is called");
    const { sessionId } = req.body;
    console.log("Session ID:", sessionId);

    // Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(session);

    // Check if the payment was successful
    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const existingOrder = await OrderModel.findOne({
      paymentId: session.payment_intent,
    });
    if (existingOrder) {
      return res
        .status(200)
        .json({ message: "Order already exists", order: existingOrder });
    }

    // Get user details and cart items from metadata
    const { userId, addressId, address, cartItems } = session.metadata;
    const parsedAddress = JSON.parse(address);
    const parsedCartItems = JSON.parse(cartItems);

    // Create new order
    const newOrder = new OrderModel({
      userId,
      items: parsedCartItems.map((item) => ({
        product: item.productId, // Match the schema
        quantity: item.quantity,
        price: item.price,
      })),
      total: (session.amount_total / 100).toFixed(2),
      status: "confirmed",
      paymentId: session.payment_intent,
      address: parsedAddress,
      paymentMethod: "debit card", // Use an allowed value
      createdAt: new Date(),
    });

    await newOrder.save();

    // Clear user's cart after successful order
    await CartModel.deleteMany({ userId });

    res
      .status(200)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error confirming payment and creating order:", error);
    res.status(500).json({
      message: "Failed to confirm payment and create order",
      error: error.message,
    });
  }
});

app.get("/admin/users", authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await EmployeeModel.find({}, "-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Update user role
app.put(
  "/admin/users/:userId/role",
  authenticateToken,
  isAdmin,
  async (req, res) => {
    try {
      const { role } = req.body;
      const user = await EmployeeModel.findByIdAndUpdate(
        req.params.userId,
        { role },
        { new: true, select: "-password" }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error updating user role" });
    }
  }
);

// Get dashboard stats
app.get("/admin/dashboard", authenticateToken, isAdmin, async (req, res) => {
  try {
    const [totalUsers, totalOrders, recentOrders, userStats] =
      await Promise.all([
        EmployeeModel.countDocuments(),
        OrderModel.countDocuments(),
        OrderModel.find().sort({ createdAt: -1 }).limit(5),
        EmployeeModel.aggregate([
          {
            $group: {
              _id: "$role",
              count: { $sum: 1 },
            },
          },
        ]),
      ]);

    res.json({
      totalUsers,
      totalOrders,
      recentOrders,
      userStats,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
});

// Get all orders (admin view)
app.get("/admin/orders", authenticateToken, isAdmin, async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// app.post("/create-checkout-session", authenticateToken, async (req, res) => {
//   try {
//     const { lineItems, selectedAddress } = req.body;

//     // Create Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:5173/my-orders",
//       cancel_url: "http://localhost:5173/checkout",
//       metadata: {
//         userId: req.user.id,
//         addressId: selectedAddress._id,
//         address: JSON.stringify({
//           addressLine1: selectedAddress.addressLine1,
//           addressLine2: selectedAddress.addressLine2,
//           city: selectedAddress.city,
//           state: selectedAddress.state,
//           zipCode: selectedAddress.zipCode,
//         }),
//       },
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).json({ error: "Failed to create checkout session" });
//   }
// });

// // Add this to your backend server file
// const endpointSecret = "your_stripe_webhook_secret"; // Replace with your webhook secret

// app.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   async (request, response) => {
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//     } catch (err) {
//       response.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }

//     // Handle the checkout.session.completed event
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;

//       try {
//         // Get user details from metadata
//         const { userId, addressId, address } = session.metadata;
//         const parsedAddress = JSON.parse(address);

//         // Get line items from Stripe
//         const lineItems = await stripe.checkout.sessions.listLineItems(
//           session.id
//         );

//         // Create new order
//         const newOrder = new OrderModel({
//           userId,
//           items: lineItems.data.map((item) => ({
//             productId: item.price.product,
//             productName: item.description,
//             quantity: item.quantity,
//             price: (item.amount_total / 100).toFixed(2), // Convert from cents to dollars
//           })),
//           total: (session.amount_total / 100).toFixed(2),
//           status: "confirmed",
//           paymentId: session.payment_intent,
//           address: parsedAddress,
//           paymentMethod: "stripe",
//           createdAt: new Date(),
//         });

//         await newOrder.save();

//         // Clear user's cart after successful order
//         await CartModel.deleteMany({ userId });
//       } catch (error) {
//         console.error("Error processing order:", error);
//         response.status(500).send("Error processing order");
//         return;
//       }
//     }

//     response.send();
//   }
// );

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

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "4h",
      }
    );
    return res.json({
      message: "Success",
      token,
      role: user.role,
      name: user.name,
    });
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

app.put("/addresses/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;
    const { addressLine1, addressLine2, city, state, zipCode } = req.body;

    // First verify that this address belongs to the user
    const existingAddress = await AddressModel.findOne({
      _id: addressId,
      userId: userId,
    });

    if (!existingAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Update the address
    const updatedAddress = await AddressModel.findByIdAndUpdate(
      addressId,
      {
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
      },
      { new: true } // This option returns the updated document
    );

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

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password, role } = req.body;
  const existingUser = await EmployeeModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      EmployeeModel.create({
        name,
        email,
        password: hash,
        role: role || "user",
      })
        .then((employees) => res.json(employees))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

app.get("/savedItems", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const savedItems = await SavedItemModel.find({ userId });
    console.log(savedItems);
    return res.json({ savedItems });
  } catch (error) {
    console.log("why am i getting this error");
    console.error("Error fetching saved items:", error);
    return res.status(500).json({ error: "Internal server error" });
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

app.post("/addToCartInCart", authenticateToken, async (req, res) => {
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
        { $set: { quantity } },
        { new: true } // Return the updated document
      );

      return res
        .status(200)
        .json({ message: "Cart item updated", cartItem: updatedCartItem });
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

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const cartItems = await CartModel.find({ userId });
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "No items in the cart" });
    }

    res.json({ cartItems });
  } catch (error) {
    console.error(error);
    returnres.status(500).json({ message: "Internal server error", error });
  }
});

// Create new distributor profile
app.post("/distributor/register", authenticateToken, async (req, res) => {
  try {
    const { companyName, contactPerson, warehouse } = req.body;

    // Check if user is a distributor
    if (req.user.role !== "distributor") {
      return res
        .status(403)
        .json({ message: "Access denied. Distributor role required." });
    }

    // Generate unique distributor ID
    const distributorId = await DistributorModel.generateDistributorId();

    // Create new distributor
    const distributor = new DistributorModel({
      userId: req.user.id,
      distributorId,
      companyName,
      contactPerson,
      warehouses: [{ ...warehouse, isPrimary: true }],
    });

    await distributor.save();
    res.status(201).json(distributor);
  } catch (error) {
    console.error("Error creating distributor:", error);
    res.status(500).json({ message: "Failed to create distributor profile" });
  }
});

//Get Warehouses
app.get("/distributor/warehouses", authenticateToken, async (req, res) => {
  try {
    const distributor = await DistributorModel.findOne({ userId: req.user.id });
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }
    res.json(distributor.warehouses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch warehouses" });
  }
});

// Add warehouse
app.post("/distributor/warehouses", authenticateToken, async (req, res) => {
  try {
    const distributor = await DistributorModel.findOne({ userId: req.user.id });
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }

    distributor.warehouses.push(req.body);
    await distributor.save();
    res.json(distributor.warehouses);
  } catch (error) {
    res.status(500).json({ message: "Failed to add warehouse" });
  }
});

// Delete warehouse
// app.delete(
//   "/distributor/warehouses/:warehouseId",
//   authenticateToken,
//   async (req, res) => {
//     try {
//       const { warehouseId } = req.params;
//       const distributor = await DistributorModel.findOne({
//         userId: req.user.id,
//       });

//       if (!distributor) {
//         return res.status(404).json({ message: "Distributor not found" });
//       }

//       const warehouse = distributor.warehouses.findByIdAndDelete(
//         { _id: warehouseId },
//         { new: true }
//       );

//       if (!warehouse) {
//         return res.status(404).json({ message: "Warehouse not found" });
//       }

//       return res.json(warehouse);
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ message: "Failed to delete warehouse", error });
//     }
//   }
// );
app.delete(
  "/distributor/warehouses/:warehouseId",
  authenticateToken,
  async (req, res) => {
    try {
      const { warehouseId } = req.params;

      // Find the distributor by userId
      const distributor = await DistributorModel.findOne({
        userId: req.user.id,
      });

      if (!distributor) {
        return res.status(404).json({ message: "Distributor not found" });
      }

      // Find the index of the warehouse in the warehouses array
      const warehouseIndex = distributor.warehouses.findIndex(
        (w) => w._id.toString() === warehouseId
      );

      if (warehouseIndex === -1) {
        return res.status(404).json({ message: "Warehouse not found" });
      }

      // Remove the warehouse from the array
      distributor.warehouses.splice(warehouseIndex, 1);

      // Save the updated distributor document
      await distributor.save();

      return res.json({ message: "Warehouse deleted successfully" });
    } catch (error) {
      console.error("Error deleting warehouse:", error);
      return res
        .status(500)
        .json({ message: "Failed to delete warehouse", error: error.message });
    }
  }
);

// Update warehouse
app.put(
  "/distributor/warehouses/:warehouseId",
  authenticateToken,
  async (req, res) => {
    try {
      const { warehouseId } = req.params;
      const distributor = await DistributorModel.findOne({
        userId: req.user.id,
      });

      if (!distributor) {
        return res.status(404).json({ message: "Distributor not found" });
      }

      const warehouseIndex = distributor.warehouses.findIndex(
        (w) => w._id.toString() === warehouseId
      );

      if (warehouseIndex === -1) {
        return res.status(404).json({ message: "Warehouse not found" });
      }

      distributor.warehouses[warehouseIndex] = {
        ...distributor.warehouses[warehouseIndex],
        ...req.body,
      };

      await distributor.save();
      res.json(distributor.warehouses[warehouseIndex]);
    } catch (error) {
      res.status(500).json({ message: "Failed to update warehouse" });
    }
  }
);

app.put(
  "/distributor/warehouses/:warehouseId/primary",
  authenticateToken,
  async (req, res) => {
    try {
      const { warehouseId } = req.params;

      // Find the distributor by userId
      const distributor = await DistributorModel.findOne({
        userId: req.user.id,
      });

      if (!distributor) {
        return res.status(404).json({ message: "Distributor not found" });
      }

      // Find the warehouse in the warehouses array
      const warehouse = distributor.warehouses.id(warehouseId);

      if (!warehouse) {
        return res.status(404).json({ message: "Warehouse not found" });
      }

      // Reset all warehouses to non-primary
      distributor.warehouses.forEach((w) => {
        w.isPrimary = false;
      });

      // Set the selected warehouse as primary
      warehouse.isPrimary = true;

      // Save the updated distributor document
      await distributor.save();

      return res.json({ message: "Primary warehouse updated successfully" });
    } catch (error) {
      console.error("Error setting primary warehouse:", error);
      return res.status(500).json({
        message: "Failed to set primary warehouse",
        error: error.message,
      });
    }
  }
);

// Add product to warehouse inventory
app.post(
  "/distributor/warehouses/:warehouseId/inventory",
  authenticateToken,
  async (req, res) => {
    try {
      const { warehouseId } = req.params;
      const { productId, quantity } = req.body;

      const distributor = await DistributorModel.findOne({
        userId: req.user.id,
      });
      if (!distributor) {
        return res.status(404).json({ message: "Distributor not found" });
      }

      const warehouse = distributor.warehouses.id(warehouseId);
      if (!warehouse) {
        return res.status(404).json({ message: "Warehouse not found" });
      }

      // Check if product already exists in inventory
      const existingProduct = warehouse.inventory.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        warehouse.inventory.push({ productId, quantity });
      }

      await distributor.save();
      res.json(warehouse.inventory);
    } catch (error) {
      res.status(500).json({ message: "Failed to update inventory" });
    }
  }
);

// Get distributor profile
app.get("/distributor/profile", authenticateToken, async (req, res) => {
  try {
    const distributor = await DistributorModel.findOne({
      userId: req.user.id,
    }).populate("products.productId");

    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }

    res.json(distributor);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch distributor profile" });
  }
});

// Add product to distributor catalog
app.post("/distributor/products", authenticateToken, async (req, res) => {
  try {
    const { productId, price } = req.body;

    const distributor = await DistributorModel.findOne({ userId: req.user.id });
    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }

    // Check if product already exists
    const existingProduct = distributor.products.find(
      (p) => p.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.price = price;
      existingProduct.active = true;
    } else {
      distributor.products.push({ productId, price });
    }

    await distributor.save();
    res.json(distributor.products);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product" });
  }
});

// Update product price
app.put(
  "/distributor/products/:productId",
  authenticateToken,
  async (req, res) => {
    try {
      const { productId } = req.params;
      const { price, active } = req.body;

      const distributor = await DistributorModel.findOne({
        userId: req.user.id,
      });
      if (!distributor) {
        return res.status(404).json({ message: "Distributor not found" });
      }

      const product = distributor.products.find(
        (p) => p.productId.toString() === productId
      );

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.price = price;
      if (typeof active !== "undefined") {
        product.active = active;
      }

      await distributor.save();
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to update product" });
    }
  }
);

app.listen(3002, () => {
  console.log("Server is running, http://localhost:3002");
});
