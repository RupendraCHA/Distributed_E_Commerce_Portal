const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const mustache = require("mustache");
const puppeteer = require("puppeteer");
require("dotenv/config.js");
const Stripe = require("stripe");

const {
  EmployeeModel,
  AddressModel,
  OrderModel,
  CartModel,
  SavedItemModel,
  DistributorModel,
  ProductModel,
  GoodsReceiptModel,
  InboundDeliveryModel,
  VendorBillModel,
  VendorMasterModel,
  ItemInfoRecordModel,
} = require("./Models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAdmin } = require("./authentication");
const { authenticateToken } = require("./authentication");

const posetraProducts = require("./data/posetraProducts");
const RequisitionModel = require("./Models/RequisitionSchema");
const MaterialModel = require("./Models/MaterialsModel");
const PurchaseOrderModel = require("./Models/PurchaseOrderSchema");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
  })
);

// const JWT_SECRET = "Account_Test";

const MONGO_URI = process.env.MONGO_URI;
const Stripe_Key = process.env.Stripe_Key;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

// const checkoutURLs = "https://posetra-e-commerce-portal-1.onrender.com"
// const checkoutURLs = "https://distributed-e-commerce-portal-frontend.onrender.com"
const checkoutURLs = "http://localhost:5173";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to Database Successfully!`);
  } catch (error) {
    console.log("Error While connecting to MongoDB", error.message);
  }
};
connectDB();

const stripe = Stripe(Stripe_Key);

app.get("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html>
        <head>
        <link
      rel="icon"
      type="image/svg+xml"
      href="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738926639/Posetra_Logo1_bcwdlt.jpg"
    />
          <title>POSETRA E-Commerce Server</title>
          <style>
            div{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #506bf2;
            }
            h1{
                color: white;
            }
          </style>
        </head>
        <body>
            <div>
                <h1>POSETRA Distributed E-Commerce Portal - Successfully started the Server</h1>
            </div>
        </body>
        </html>
      `);
});

const getSapDataDetails = async () => {
  const url =
    "http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/ZMATERIAL_SRV/Material_data1Set?$format=json";
  const username = "NikhilA";
  const password = "Nikhil@12345";
  // Encode the credentials in base64 for Basic Authentication
  const headers = new Headers();
  headers.set("Authorization", "Basic " + btoa(username + ":" + password));
  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  let updatedData;
  // Check if the response is okay
  let dataFieldsForSAP = [];
  if (response.ok) {
    const data = await response.json();

    // # 3) Destructuring the fields, adding them into an Array and consoling them

    data.d.results.map((eachRecord) => {
      let newObject = {
        productId: eachRecord.Product_ID,
        productName: eachRecord.Product,
        category: eachRecord.Material_Category,
        brand: "",
        description: eachRecord.Material_Description,
        price: eachRecord.Price_Of_Product,
        weight: eachRecord.Allowed_Packaging_Weight,
        stock: eachRecord.Storage_percentage,
        expirationDate: eachRecord.Expiration_Date,
        image: "",
      };
      dataFieldsForSAP.push(newObject);
    });
    // console.log(dataFieldsForSAP)

    const getProductId = (product) => {
      return (
        product.productId.slice(0, 1).toUpperCase() +
        product.productId.slice(1, product.productId.length)
      );
    };
    const updatedData1 = dataFieldsForSAP.map((product) => {
      if (product.productName === "AGRPUMP") {
        return {
          ...product,
          productId: getProductId(product),
          category: "Materials",
          brand: "Materials",
          weight: product.weight + " lb",
          image:
            "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738206530/41jM54U8FgL._AC_UF1000_1000_QL80__pyongi.jpg",
        };
      } else if (product.productName === "BENALIUM") {
        return {
          ...product,
          productId: getProductId(product),
          category: "Materials",
          brand: "Materials",
          weight: product.weight + " lb",
          image:
            "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738206617/images_hqeypc.jpg",
        };
      } else if (product.productName === "BRASS") {
        return {
          ...product,
          productId: getProductId(product),
          category: "Materials",
          brand: "Materials",
          weight: product.weight + " lb",
          image:
            "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738206705/brass-metal-components_bxwkyf.jpg",
        };
      } else if (product.productName === "LED") {
        return {
          ...product,
          productId: getProductId(product),
          category: "Materials",
          brand: "Materials",
          weight: product.weight + " lb",
          image:
            "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738206775/led-bulb-raw-material-500x500_otjrgh.webp",
        };
      } else if (product.productName === "MNIPICKAXES") {
        return {
          ...product,
          productId: getProductId(product),
          category: "Materials",
          brand: "Materials",
          weight: product.weight + " lb",
          image:
            "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738206885/ImageForArticle_1446_17219052982689037_kgkxpu.webp",
        };
      } else if (product.productName === "SITTAPER") {
        return {
          ...product,
          productId: getProductId(product),
          category: "Materials",
          brand: "Materials",
          weight: product.weight + " lb",
          image:
            "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738207536/images_1_a6hh4a.jpg",
        };
      } else if (product.productName === "SULPHUR") {
        return {
          ...product,
          productId: getProductId(product),
          category: "Materials",
          brand: "Materials",
          weight: product.weight + " lb",
          image:
            "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738208651/360_F_85756492_i638LcwoFrymrBj96ZMHP4nL4BOolKfK_ai3zwv.jpg",
        };
      } else if (product.productName === "THORIUM") {
        return {
          ...product,
          productId: getProductId(product),
          category: "Materials",
          brand: "Materials",
          weight: product.weight + " lb",
          image:
            "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738208805/b90b79a0-fcb7-40ea-955d-729b1a85e92b_484973f3_wrdyaa.webp",
        };
      } else if (product.productName === "TIE") {
        return {
          ...product,
          productId: getProductId(product),
          category: "Materials",
          brand: "Materials",
          weight: product.weight + " lb",
          productName: "URANIUM",
          category: "fashion accessories",
          description: "This is Radioactive element & generates Nuclear Energy",
          image:
            "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738208888/uranium-chemical-element_gojtdh.webp",
        };
      } else if (product.productName === "TILE") {
        return {
          ...product,
          productId: getProductId(product),
          category: "Materials",
          brand: "Materials",
          weight: product.weight + " lb",
          image:
            "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738208950/1711451520993_ylgnow.jpg",
        };
      }
    });
    updatedData = updatedData1;
  }
  // console.log("U",updatedData)
  return updatedData;
};

// const SAP = getSapDataDetails()

// Get dashboard stats
// /api/v1/admin/dashboard API
app.get(
  "/api/v1/admin/dashboard",
  authenticateToken,
  isAdmin,
  async (req, res) => {
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
  }
);

app.post("/api/v1/create-checkout-session", async (req, res) => {
  try {
    const { lineItems, selectedAddress, userId, cartItems, deliveryType } =
      req.body;

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
      success_url: checkoutURLs + `/success?session_id={CHECKOUT_SESSION_ID}`,
      // // Pass session ID to success URL
      cancel_url: checkoutURLs + `/cancel`,
      // success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      // // // Pass session ID to success URL
      // cancel_url: `http://localhost:5173/cancel`,
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
        deliveryType,
        cartItems: JSON.stringify(
          cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            productName: item.productName,
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

app.get("/api/v1/getDataFromSap", async (req, res) => {
  try {
    const updatedData = await getSapDataDetails();
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    console.error("Error:", error);
  }
});

app.get("/api/v1/distributors/products", async (req, res) => {
  try {
    let allProductsData;
    const distributors = await DistributorModel.find();

    // Consolidate product quantities from all distributors using reduce
    const productQuantities = distributors.reduce((acc, distributor) => {
      distributor.warehouses.forEach((warehouse) => {
        warehouse.inventory.forEach((item) => {
          acc[item.productId] = (acc[item.productId] || 0) + item.quantity;
        });
      });
      return acc;
    }, {});
    console.log(distributors);
    // Fetch all products
    const products = await ProductModel.find();
    console.log(products);

    // Map product data and merge quantity from productQuantities
    const finalProductList = products
      .map((product) =>
        productQuantities[product.productId] > 0
          ? {
            ...product.toObject(),
            quantity: productQuantities[product.productId] || 0, // Ensure default is 0
          }
          : {}
      )
      .filter((product) => product.productId);

    // Log to verify the final list of products
    // console.log(finalProductList);

    const url =
      "http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/ZMATERIAL_SRV/Material_data1Set?$format=json";
    const username = "NikhilA";
    const password = "Nikhil@12345";
    // Encode the credentials in base64 for Basic Authentication
    const headers = new Headers();
    headers.set("Authorization", "Basic " + btoa(username + ":" + password));
    // Make the request to the OData service
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    // Check if the response is okay
    let dataFieldsForSAP = [];
    if (response.ok) {
      const data = await response.json();

      // # 3) Destructuring the fields, adding them into an Array and consoling them

      data.d.results.map((eachRecord) => {
        let newObject = {
          productId: eachRecord.Product_ID,
          productName: eachRecord.Product,
          category: eachRecord.Material_Category,
          brand: "",
          description: eachRecord.Material_Description,
          price: eachRecord.Price_Of_Product,
          weight: eachRecord.Allowed_Packaging_Weight,
          stock: eachRecord.Storage_percentage,
          expirationDate: eachRecord.Expiration_Date,
          image: "",
        };
        dataFieldsForSAP.push(newObject);
      });
      // console.log(dataFieldsForSAP)

      const getProductId = (product) => {
        return (
          product.productId.slice(0, 1).toUpperCase() +
          product.productId.slice(1, product.productId.length)
        );
      };
      const updatedData = dataFieldsForSAP.map((product) => {
        if (product.productName === "AGRPUMP") {
          return {
            ...product,
            productId: getProductId(product),
            category: "Materials",
            brand: "Materials",
            weight: product.weight + " lb",
            image:
              "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738206530/41jM54U8FgL._AC_UF1000_1000_QL80__pyongi.jpg",
          };
        } else if (product.productName === "BENALIUM") {
          return {
            ...product,
            productId: getProductId(product),
            category: "Materials",
            brand: "Materials",
            weight: product.weight + " lb",
            image:
              "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738206617/images_hqeypc.jpg",
          };
        } else if (product.productName === "BRASS") {
          return {
            ...product,
            productId: getProductId(product),
            category: "Materials",
            brand: "Materials",
            weight: product.weight + " lb",
            image:
              "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738206705/brass-metal-components_bxwkyf.jpg",
          };
        } else if (product.productName === "LED") {
          return {
            ...product,
            productId: getProductId(product),
            category: "Materials",
            brand: "Materials",
            weight: product.weight + " lb",
            image:
              "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738206775/led-bulb-raw-material-500x500_otjrgh.webp",
          };
        } else if (product.productName === "MNIPICKAXES") {
          return {
            ...product,
            productId: getProductId(product),
            category: "Materials",
            brand: "Materials",
            weight: product.weight + " lb",
            image:
              "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738206885/ImageForArticle_1446_17219052982689037_kgkxpu.webp",
          };
        } else if (product.productName === "SITTAPER") {
          return {
            ...product,
            productId: getProductId(product),
            category: "Materials",
            brand: "Materials",
            weight: product.weight + " lb",
            image:
              "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738207536/images_1_a6hh4a.jpg",
          };
        } else if (product.productName === "SULPHUR") {
          return {
            ...product,
            productId: getProductId(product),
            category: "Materials",
            brand: "Materials",
            weight: product.weight + " lb",
            image:
              "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738208651/360_F_85756492_i638LcwoFrymrBj96ZMHP4nL4BOolKfK_ai3zwv.jpg",
          };
        } else if (product.productName === "THORIUM") {
          return {
            ...product,
            productId: getProductId(product),
            category: "Materials",
            brand: "Materials",
            weight: product.weight + " lb",
            image:
              "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738208805/b90b79a0-fcb7-40ea-955d-729b1a85e92b_484973f3_wrdyaa.webp",
          };
        } else if (product.productName === "TIE") {
          return {
            ...product,
            productId: getProductId(product),
            category: "Materials",
            brand: "Materials",
            weight: product.weight + " lb",
            productName: "URANIUM",
            category: "fashion accessories",
            description:
              "This is Radioactive element & generates Nuclear Energy",
            image:
              "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738208888/uranium-chemical-element_gojtdh.webp",
          };
        } else if (product.productName === "TILE") {
          return {
            ...product,
            productId: getProductId(product),
            category: "Materials",
            brand: "Materials",
            weight: product.weight + " lb",
            image:
              "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738208950/1711451520993_ylgnow.jpg",
          };
        }
      });

      allProductsData = await getSapDataDetails();
      // console.log("updatedDataForDetails",updatedData)
      // res.status(200).json({success: true, data:updatedData})
      // res.status(200).json({success: true, data:dataFieldsForSAP})
    } else {
      console.error("Failed to fetch data", response.status);
    }
    // console.log("AllProductsData",allProductsData)
    // console.log("AllProductsData1",finalProductList)
    const allProductsDetails = [...finalProductList, ...allProductsData];
    // console.log("AllProductsDetails",allProductsDetails, "Successfull!!!")
    // res.status(200).json(finalProductList);
    res.status(200).json(allProductsDetails);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/confirm-payment", authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.body;

    // Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if the payment was successful
    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // Check if an order with the same paymentId already exists
    const existingOrder = await OrderModel.findOne({
      paymentId: session.payment_intent,
    });
    if (existingOrder) {
      return res
        .status(200)
        .json({ message: "Order already exists", order: existingOrder });
    }

    // Get metadata from the session
    console.log(session.metadata);
    const { userId, addressId, address, cartItems, deliveryType, lineItems } =
      session.metadata;
    const parsedCartItems = JSON.parse(cartItems);
    const parsedAddress = JSON.parse(address);

    // Find the user to check their role
    const user = await EmployeeModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Logic for Distributors (Restocking Warehouse)
    if (user.role === "distributor") {
      // Find the distributor associated with the user
      const distributor = await DistributorModel.findOne({ userId });
      if (!distributor) {
        return res.status(404).json({ message: "Distributor not found" });
      }

      // Find the warehouse using the addressId from metadata
      const warehouse = distributor.warehouses.find(
        (warehouse) => warehouse._id.toString() === addressId
      );
      console.log(warehouse);
      if (!warehouse) {
        return res.status(404).json({ message: "Warehouse not found" });
      }

      // Update warehouse inventory (restock items)
      for (const item of parsedCartItems) {
        const productInWarehouse = warehouse.inventory.find(
          (inv) => inv.productId.toString() === item.productId
        );

        if (productInWarehouse) {
          // If the product already exists in the warehouse, increase the quantity
          productInWarehouse.quantity += item.quantity;
        } else {
          // If the product doesn't exist, add it to the warehouse inventory
          warehouse.inventory.push({
            productId: item.productId,
            quantity: item.quantity, // Add the ordered quantity
          });
        }
      }

      // Save the updated distributor with the modified warehouse inventory
      await distributor.save();

      // Create a new order record for the restocking
      const newOrder = new OrderModel({
        userId,
        items: parsedCartItems.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.productName,
        })),
        total: (session.amount_total / 100).toFixed(2),
        status: "confirmed",
        paymentId: session.payment_intent,
        address: parsedAddress, // Use warehouse address
        paymentMethod: "debit card",
        deliveryType: deliveryType,
        createdAt: new Date(),
        orderType: "warehouse_restock", // Indicate this is a restocking order
      });

      await newOrder.save();

      // Clear user's cart after successful order
      await CartModel.deleteMany({ userId });

      return res.status(200).json({
        message: "Warehouse restocking order created successfully",
        order: newOrder,
      });
    }

    // Logic for Normal Customers (Create Order and Clear Cart)
    else if (user.role === "user") {
      // Create a new order for the customer
      const newOrder = new OrderModel({
        userId,
        items: parsedCartItems.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.productName,
        })),
        total: (session.amount_total / 100).toFixed(2),
        status: "confirmed",
        paymentId: session.payment_intent,
        address: parsedAddress,
        paymentMethod: "debit card",
        deliveryType: deliveryType,
        createdAt: new Date(),
        orderType: "customer_order", // Indicate this is a customer order
      });

      await newOrder.save();

      // Clear the customer's cart
      await CartModel.deleteMany({ userId });

      return res.status(200).json({
        message: "Customer order created successfully",
        order: newOrder,
      });
    }

    // If the user role is neither distributor nor customer
    else {
      return res.status(400).json({ message: "Invalid user role" });
    }
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

// Get all orders (admin view)
app.get("/admin/orders", authenticateToken, isAdmin, async (req, res) => {
  // try {
  //   const orders = await OrderModel.find()
  //     .sort({ createdAt: -1 })
  //     .populate("userId", "name email");
  //   res.json(orders);
  // } catch (error) {
  //   res.status(500).json({ message: "Error fetching orders" });
  // }
  try {
    const userId = req.user.id; // Corrected to use req.user.id
    const orders = await OrderModel.find({}); // Fetch orders by user ID

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});
app.get("/api/v1/allorders", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Corrected to use req.user.id
    const orders = await OrderModel.find({}); // Fetch orders by user ID
    // let usersOrders = []
    const usersOrders = orders.filter(
      (order) => userId !== order.userId.toString()
    );

    res.json(usersOrders);
    // res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

app.get("/distributors/products", async (req, res) => {
  try {
    const distributors = await DistributorModel.find();
    const products = await ProductModel.find();
    const productDataMap = {};

    function extractFloats(text) {
      return text ? text.match(/\d+(\.\d+)?/g)?.map(Number)[0] || 0 : 0; // Extract float safely
    }

    for (const distributor of distributors) {
      // Fetch employee (user) using distributor's userId
      const employee = await EmployeeModel.findById(distributor.userId);
      const markUpValue = employee?.markUpValue || 0; // Default to 0 if not found

      distributor.warehouses.forEach((warehouse) => {
        warehouse.inventory.forEach((item) => {
          const product = products.find((p) => p.productId === item.productId);
          const productPrice = product ? extractFloats(product.price) : 0; // Get product price
          const basePrice = extractFloats(item.newPrice) || productPrice; // Prioritize newPrice
          const finalPrice = basePrice + (basePrice * markUpValue) / 100; // Apply markup

          const key = `${item.productId}_${basePrice}`;

          if (!productDataMap[key]) {
            productDataMap[key] = {
              productId: item.productId,
              quantity: 0,
              price: finalPrice,
              warehouseDetails: [],
              distributors: new Set(),
            };
          }

          productDataMap[key].quantity += item.quantity;
          productDataMap[key].warehouseDetails.push({
            warehouseId: warehouse._id,
            warehouseName: warehouse.city,
            warehouseLocation: warehouse.addressLine1,
          });

          productDataMap[key].distributors.add(distributor._id);
        });
      });
    }

    const finalProductList = Object.values(productDataMap)
      .map((productInfo) => {
        const product = products.find(
          (p) => p.productId === productInfo.productId
        );
        return product
          ? {
            ...product.toObject(),
            quantity: productInfo.quantity,
            price: `$${productInfo.price || product.price || 0}`,
            distributorIds: Array.from(productInfo.distributors),
            warehouseDetails: productInfo.warehouseDetails,
          }
          : null;
      })
      .filter((product) => product !== null);

    res.status(200).json(finalProductList);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/v1/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email: email });
    console.log({ user });
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
        expiresIn: "24h",
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
app.get("/api/v1/user", authenticateToken, (req, res) => {
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

app.put("/api/v1/user", authenticateToken, (req, res) => {
  const userId = req.user.id; // Extract user ID from token
  const { name, email } = req.body; // Get updated name and email from request body

  EmployeeModel.findByIdAndUpdate(userId, { name, email }, { new: true }) // Update user details
    .then((user) => {
      if (user) {
        res.json({
          message: "User data updated successfully",
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

app.get("/api/v1/user/markup", authenticateToken, async (req, res) => {
  try {
    const user = await EmployeeModel.findById(req.user.id);
    console.log({ user });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ markUpValue: user.markUpValue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update markup value for authenticated user
app.put("/api/v1/user/markup", authenticateToken, async (req, res) => {
  try {
    const { markUpValue } = req.body;

    if (isNaN(markUpValue) || markUpValue < 0) {
      return res.status(400).json({ message: "Invalid markup value" });
    }

    const user = await EmployeeModel.findByIdAndUpdate(
      req.user.id,
      { markUpValue },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "Markup value updated successfully",
      markUpValue: user.markUpValue,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/v1/addresses", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await AddressModel.find({ userId });
    res.json(addresses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/addresses", authenticateToken, async (req, res) => {
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

app.put(
  "/api/v1/addresses/:id/primary",
  authenticateToken,
  async (req, res) => {
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
  }
);

app.put("/api/v1/addresses/:id", authenticateToken, async (req, res) => {
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

app.delete("/api/v1/addresses/:id", authenticateToken, async (req, res) => {
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
app.get("/api/v1/orders", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Corrected to use req.user.id
    const orders = await OrderModel.find({ userId }); // Fetch orders by user ID
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

app.get(
  "/api/v1/ordersForInvoice/:orderId",
  authenticateToken,
  async (req, res) => {
    const { orderId } = req.params;
    // console.log(orderId)
    try {
      const userId = req.user.id; // Corrected to use req.user.id

      // Convert the orderId string to ObjectId
      const objectId = new mongoose.Types.ObjectId(orderId);

      // Find the order in the database
      const order = await OrderModel.findOne({ _id: objectId });
      // order.push(order.deliveryType)
      // console.log("ORDER", order.items)

      const orders = await OrderModel.find({ userId }); // Fetch orders by user ID

      // console.log("orderData",orderData)
      res.json({ orders: orders, orderDetails: order });
      // res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching orders" });
    }
  }
);

app.get("/api/v1/orders/:orderId/invoice", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await OrderModel.findById(orderId); // Your Order Model

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const invoicesDir = path.join(__dirname, "invoices");
    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir, { recursive: true });
    }

    const template = fs.readFileSync(
      path.join(__dirname, "templates/invoice.mustache"),
      "utf8"
    );

    const data = {
      orderId: order._id,
      date: new Date(order.createdAt).toDateString(), // Format the date
      items: order.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: order.total,
      paymentMethod: order.paymentMethod,
      address: order.address, // Include address information
    };

    // Generate HTML content using Mustache
    const htmlContent = mustache.render(template, data);
    const htmlFilePath = path.join(invoicesDir, `order-${orderId}.html`);

    // Save the HTML file
    fs.writeFileSync(htmlFilePath, htmlContent);

    // Convert the HTML file to PDF using Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfFilePath = path.join(invoicesDir, `order-${orderId}.pdf`);
    await page.pdf({ path: pdfFilePath, format: "A4" });

    await browser.close();

    res.download(pdfFilePath, `invoice-${orderId}.pdf`, () => {
      // Optional: Delete files after sending
      fs.unlinkSync(htmlFilePath);
      fs.unlinkSync(pdfFilePath);
    });
  } catch (error) {
    console.error("Error generating invoice:", error);
    res.status(500).json({ message: "Error generating invoice" });
  }
});

app.patch("/api/v1/orders/:orderId/status", async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error });
  }
});

app.put("/api/v1/order/:id/status", async (req, res) => {
  const { id } = req.params;
  const updateOrderData = await OrderModel.findById(id);
  // console.log("updatedORDERDATA",updateOrderData)

  updateOrderData.status = "Shipped on";
  updateOrderData.createdAt = new Date();
  updateOrderData.save();
  res.status(200).json({
    status: updateOrderData.status,
    orderedItems: updateOrderData.items,
    id: updateOrderData._id,
    createdAt: updateOrderData.createdAt,
  });
});

app.post("/api/v1/register", async (req, res) => {
  // console.log(req.body);
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

app.get("/api/v1/savedItems", authenticateToken, async (req, res) => {
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

app.post(
  "/api/v1/moveToCart/:productId",
  authenticateToken,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const productId = req.params.productId;

      // Get the saved item
      const savedItem = await SavedItemModel.findOne({ userId, productId });
      if (!savedItem) {
        return res.status(404).json({ message: "Saved item not found" });
      }

      let cartItem = await CartModel.findOne({ userId, productId });

      if (cartItem) {
        // If item already exists in cart, update the quantity
        cartItem.quantity += savedItem.quantity;
        await cartItem.save();
      } else {
        // Create new cart item with the quantity from saved items
        cartItem = new CartModel({
          userId,
          productId,
          quantity: savedItem.quantity, // Preserve the saved quantity
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
      }

      // Remove from saved items
      await SavedItemModel.findOneAndDelete({ userId, productId });

      res.json({ message: "Item moved to cart", cartItem });
    } catch (error) {
      console.error("Error moving item to cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

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

app.post(
  "/api/v1/saveForLater/:productId",
  authenticateToken,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const productId = req.params.productId;
      const { quantity } = req.body;

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
      const savedItem = await new SavedItemModel({
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
        quantity: quantity || cartItem.quantity,
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
  }
);

app.post("/api/v1/addToCart", authenticateToken, async (req, res) => {
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

app.delete("/api/v1/cart/:id", authenticateToken, async (req, res) => {
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

app.get("/api/v1/cart", authenticateToken, async (req, res) => {
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
app.post(
  "/api/v1/distributor/register",
  authenticateToken,
  async (req, res) => {
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
  }
);

//Get Warehouses
app.get(
  "/api/v1/distributor/warehouses",
  authenticateToken,
  async (req, res) => {
    try {
      const distributor = await DistributorModel.findOne({
        userId: req.user.id,
      });
      if (!distributor) {
        return res.status(404).json({ message: "Distributor not found" });
      }
      res.json(distributor.warehouses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch warehouses" });
    }
  }
);

// Add warehouse
app.post(
  "/api/v1/distributor/warehouses",
  authenticateToken,
  async (req, res) => {
    try {
      const distributor = await DistributorModel.findOne({
        userId: req.user.id,
      });
      if (!distributor) {
        return res.status(404).json({ message: "Distributor not found" });
      }

      distributor.warehouses.push(req.body);
      await distributor.save();
      res.json(distributor.warehouses);
    } catch (error) {
      res.status(500).json({ message: "Failed to add warehouse" });
    }
  }
);

app.delete(
  "/api/v1/distributor/warehouses/:warehouseId",
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
  "/api/v1/distributor/warehouses/:warehouseId",
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
  "/api/v1/distributor/warehouses/:warehouseId/primary",
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

app.get("/api/v1/distributor/details", authenticateToken, async (req, res) => {
  try {
    // Find the distributor associated with the logged-in user
    const distributor = await DistributorModel.findOne({ userId: req.user.id });

    if (!distributor) {
      return res.status(404).json({ message: "Distributor not found" });
    }

    // Return the distributor details
    res.status(200).json(distributor);
  } catch (error) {
    console.error("Error fetching distributor details:", error);
    res.status(500).json({
      message: "Failed to fetch distributor details",
      error: error.message,
    });
  }
});

app.get("/products", async (req, res) => {
  try {
    const productCategory = req.query.productCategory;
    // console.log({ productCategory });

    let products = await ProductModel.find({});

    if (productCategory !== "undefined") {
      products = products.filter(
        (product) =>
          product.category.toLowerCase() === productCategory.toLowerCase()
      );
    }
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all material IDs
app.get("/api/v1/getMaterialIds", authenticateToken, async (req, res) => {
  try {
    console.log("Fetching material IDs...");
    const materials = await MaterialModel.find({}, [
      "sNo",
      "itemNo",
      "materialId",
      "materialName",
      "shortText",
      "materialGroup",
      "unit",
      "plant",
      "storageLocation",
      "purchasingGroup",
      "requisitioner",
      "trackingNo",
      "splitIndicator",
      "purchasingOrg",
      "agreement",
      "itemInfoRecord",
      "mpnMaterial",
      "suppliers"
    ])

    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ message: "Server Error" });
  }
});



app.post("/api/v1/materials", authenticateToken, async (req, res) => {
  try {
    const material = new MaterialModel({ ...req.body, userId: req.user.id });
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Materials or by materialId
app.get("/api/v1/materials", authenticateToken, async (req, res) => {
  try {
    const { material } = req.query;
    const query = { userId: req.user.id };

    // If materialId is provided, add it to the query
    if (material) {
      query.materialId = material;
    }

    const materials = await MaterialModel.find(query);
    res.status(200).json(materials);
  } catch (err) {
    console.error("Failed to fetch materials:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Update Material
app.put("/api/v1/materials/:id", authenticateToken, async (req, res) => {
  try {
    const updated = await MaterialModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/v1/materials/last", authenticateToken, async (req, res) => {
  try {
    const last = ((await MaterialModel.find({})
      .sort({ itemNo: -1 })
      .limit(1)) || [])[0];
    console.log({ last });

    const lastSNo = (last?.itemNo).split("ITM")[1] || 0;
    console.log({ lastSNo: Number(lastSNo) });

    res.status(200).json({ lastSNo: Number(lastSNo) });
  } catch (error) {
    console.error("Error fetching last material:", error);
    res.status(500).json({ message: "Failed to fetch last serial number" });
  }
});

// Get Material by ID
app.get("/api/v1/materials/:id", authenticateToken, async (req, res) => {
  const material = await MaterialModel.findById(req.params.id);
  if (!material) return res.status(404).json({ error: "Material not found" });
  res.json(material);
});

// POST /api/v1/materials/bulk
app.post("/api/v1/materials/bulk", authenticateToken, async (req, res) => {
  const { materials } = req.body;
  const userId = req.user.id;

  if (!Array.isArray(materials) || materials.length === 0) {
    return res
      .status(400)
      .json({ error: "Materials must be a non-empty array" });
  }

  try {
    const createdMaterials = [];
    for (const data of materials) {
      const material = new MaterialModel({ ...data, userId });
      await material.save();
      createdMaterials.push(material);
    }
    res.status(201).json(createdMaterials);
  } catch (err) {
    console.error("Bulk material creation failed:", err);
    res.status(500).json({ error: "Error creating materials" });
  }
});

// Create a new purchase requisition
app.post("/api/v1/requisition", authenticateToken, async (req, res) => {
  try {
    console.log("Creating requisition for user:", req.user.id);
    const { materials } = req.body;

    const materialIds = materials.map((m) => m.materialId);
    const existingMaterials = await MaterialModel.find({
      materialId: { $in: materialIds },
    });

    if (existingMaterials.length !== materials.length) {
      return res
        .status(400)
        .json({ message: "Some materials are invalid or do not exist." });
    }

    const enrichedMaterials = materials.map((m, index) => {
      const foundMaterial = existingMaterials.find(
        (mat) => mat.materialId === m.materialId
      );
      return {
        sNo: index + 1,
        itemNo: foundMaterial
          ? foundMaterial.itemNo
          : `ITM${String(index + 1).padStart(3, "0")}`,
        materialId: m.materialId,
        materialName: foundMaterial ? foundMaterial.materialName : "",
        shortText: foundMaterial ? foundMaterial.shortText : "",
        materialGroup: foundMaterial ? foundMaterial.materialGroup : "",
        unit: foundMaterial ? foundMaterial.unit : "",
        quantity: m.quantity,
        deliveryDate: m.deliveryDate,
        plant: m.plant || "",
        storageLocation: m.storageLocation || "",
        purchasingGroup: m.purchasingGroup || "",
        requisitioner: m.requisitioner || "",
        trackingNo: m.trackingNo || "",
        supplier: m.supplier || "",
        vendor: m.vendor || "",
        fixedVendorIS: m.fixedVendorIS || "",
        status: "Open", // Default status
        readVendorSPG: m.readVendorSPG || "",
        splitIndicator: m.splitIndicator || "",
        purchasingOrg: m.purchasingOrg || "",
        agreement: m.agreement || "",
        itemInfoRecord: m.itemInfoRecord || "",
        mpnMaterial: m.mpnMaterial || "",
      };
    });

    const newRequisition = new RequisitionModel({
      userId: req.user.id,
      materials: enrichedMaterials,
    });

    await newRequisition.save();
    res.status(201).json({
      message: "Requisition created successfully",
      requisition: newRequisition,
    });
  } catch (error) {
    console.error("Error saving requisition:", error.message);
    res.status(500).json({ message: "Error saving requisition" });
  }
});

// Get all requisitions for the logged-in user
app.get("/api/v1/requisition", authenticateToken, async (req, res) => {
  try {
    console.log("Fetching requisitions for user:", req.user.id);
    const requisitions = await RequisitionModel.find({ userId: req.user.id });
    res.json(requisitions);
  } catch (error) {
    console.error("Error fetching requisitions:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get a single requisition by ID
app.get("/api/v1/requisition/:id", authenticateToken, async (req, res) => {
  try {
    console.log("Fetching requisition ID:", req.params.id);
    const requisition = await RequisitionModel.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!requisition)
      return res.status(404).json({ message: "Requisition not found" });

    res.json(requisition);
  } catch (error) {
    console.error("Error fetching requisition:", error.message);
    res.status(500).json({ message: "Error fetching requisition" });
  }
});

// Update a requisition
app.put("/api/v1/requisition/:id", authenticateToken, async (req, res) => {
  try {
    console.log("Updating requisition ID:", req.params.id);
    const { materials } = req.body;

    const materialIds = materials.map((m) => m.materialId);
    const existingMaterials = await MaterialModel.find({
      materialId: { $in: materialIds },
    });

    if (existingMaterials.length !== materials.length) {
      return res
        .status(400)
        .json({ message: "Some materials are invalid or do not exist." });
    }

    const enrichedMaterials = materials.map((m, index) => {
      const foundMaterial = existingMaterials.find(
        (mat) => mat.materialId === m.materialId
      );
      return {
        sNo: index + 1,
        itemNo: foundMaterial
          ? foundMaterial.itemNo
          : `ITM${String(index + 1).padStart(3, "0")}`,
        materialId: m.materialId,
        materialName: foundMaterial ? foundMaterial.materialName : "",
        shortText: foundMaterial ? foundMaterial.shortText : "",
        materialGroup: foundMaterial ? foundMaterial.materialGroup : "",
        unit: m.unit ?? foundMaterial?.unit ?? "",
        quantity: m.quantity,
        deliveryDate: m.deliveryDate,
        plant: m.plant || "",
        storageLocation: m.storageLocation || "",
        purchasingGroup: m.purchasingGroup || "",
        requisitioner: m.requisitioner || "",
        trackingNo: m.trackingNo || "",
        supplier: m.supplier || "",
        vendor: m.vendor || "",
        fixedVendorIS: m.fixedVendorIS || "",
        status: m.status || "Open",
        readVendorSPG: m.readVendorSPG || "",
        splitIndicator: m.splitIndicator || "",
        purchasingOrg: m.purchasingOrg || "",
        agreement: m.agreement || "",
        itemInfoRecord: m.itemInfoRecord || "",
        mpnMaterial: m.mpnMaterial || "",
      };
    });

    const updatedRequisition = await RequisitionModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { materials: enrichedMaterials },
      { new: true }
    );

    if (!updatedRequisition)
      return res.status(404).json({ message: "Requisition not found" });

    res.status(200).json({
      message: "Requisition updated successfully",
      requisition: updatedRequisition,
    });
  } catch (error) {
    console.error("Error updating requisition:", error.message);
    res.status(500).json({ message: "Error updating requisition" });
  }
});

// 📌 Create a new Purchase Order
app.post("/api/v1/purchase-order", authenticateToken, async (req, res) => {
  try {
    const { supplierId, supplierName, documentDate, items } = req.body;

    if (!supplierId || !supplierName || !documentDate || !items.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPO = new PurchaseOrderModel({
      userId: req.user.id,
      supplierId,
      supplierName,
      documentDate,
      items: items.map((item, index) => ({
        sNo: index + 1,
        itemNo: `ITM${String(index + 1).padStart(3, "0")}`,
        materialId: item.materialId || "",
        materialName: item.materialName || "",
        shortText: item.shortText || "",
        materialGroup: item.materialGroup || "",
        quantity: item.quantity || 1,
        unit: item.unit || "",
        deliveryDate: item.deliveryDate || "",
        startDate: item.startDate || "",
        endDate: item.endDate || "",
        plant: item.plant || "",
        storageLocation: item.storageLocation || "",
        batch: item.batch || "",
        stockSegment: item.stockSegment || "",
        requestSegment: item.requestSegment || "",
        requirementNo: item.requirementNo || "",
        requisitioner: item.requisitioner || "",
        netPrice: item.netPrice || 0,
        currency: item.currency || "INR",
        taxCode: item.taxCode || "",
        infoRecord: item.infoRecord || "",
        outlineAgreement: item.outlineAgreement || "",
        issuingStorageLocation: item.issuingStorageLocation || "",
        servicePerformer: item.servicePerformer || "",
        revisionLevel: item.revisionLevel || "",
        supplierMatNo: item.supplierMatNo || "",
        supplierSubrange: item.supplierSubrange || "",
        supplierBatch: item.supplierBatch || "",
        commodityCode: item.commodityCode || "",
      })),
    });

    await newPO.save();
    res.status(201).json({
      message: "Purchase Order created successfully",
      purchaseOrder: newPO,
    });
  } catch (error) {
    console.error("Error creating Purchase Order:", error.message);
    res.status(500).json({ message: "Error creating Purchase Order" });
  }
});

// 📌 Get all Purchase Orders
app.get("/api/v1/purchase-orders", authenticateToken, async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrderModel.find({
      userId: req.user.id,
    });
    res.json(purchaseOrders);
  } catch (error) {
    console.error("Error fetching Purchase Orders:", error.message);
    res.status(500).json({ message: "Error fetching Purchase Orders" });
  }
});

// 📌 Get a single Purchase Order by ID
app.get("/api/v1/purchase-order/:id", authenticateToken, async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrderModel.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!purchaseOrder)
      return res.status(404).json({ message: "Purchase Order not found" });

    res.json(purchaseOrder);
  } catch (error) {
    console.error("Error fetching Purchase Order:", error.message);
    res.status(500).json({ message: "Error fetching Purchase Order" });
  }
});

// 📌 Update a Purchase Order
app.put("/api/v1/purchase-order/:id", authenticateToken, async (req, res) => {
  try {
    const { supplierId, supplierName, documentDate, items } = req.body;

    if (!supplierId || !supplierName || !documentDate || !items.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedPO = await PurchaseOrderModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        supplierId,
        supplierName,
        documentDate,
        items: items.map((item, index) => ({
          sNo: index + 1,
          itemNo: `ITM${String(index + 1).padStart(3, "0")}`,
          materialId: item.materialId || "",
          materialName: item.materialName || "",
          shortText: item.shortText || "",
          materialGroup: item.materialGroup || "",
          quantity: item.quantity || 1,
          unit: item.unit || "",
          deliveryDate: item.deliveryDate || "",
          startDate: item.startDate || "",
          endDate: item.endDate || "",
          plant: item.plant || "",
          storageLocation: item.storageLocation || "",
          batch: item.batch || "",
          stockSegment: item.stockSegment || "",
          requestSegment: item.requestSegment || "",
          requirementNo: item.requirementNo || "",
          requisitioner: item.requisitioner || "",
          netPrice: item.netPrice || 0,
          currency: item.currency || "INR",
          taxCode: item.taxCode || "",
          infoRecord: item.infoRecord || "",
          outlineAgreement: item.outlineAgreement || "",
          issuingStorageLocation: item.issuingStorageLocation || "",
          servicePerformer: item.servicePerformer || "",
          revisionLevel: item.revisionLevel || "",
          supplierMatNo: item.supplierMatNo || "",
          supplierSubrange: item.supplierSubrange || "",
          supplierBatch: item.supplierBatch || "",
          commodityCode: item.commodityCode || "",
        })),
      },
      { new: true }
    );

    if (!updatedPO)
      return res.status(404).json({ message: "Purchase Order not found" });

    res.status(200).json({
      message: "Purchase Order updated successfully",
      purchaseOrder: updatedPO,
    });
  } catch (error) {
    console.error("Error updating Purchase Order:", error.message);
    res.status(500).json({ message: "Error updating Purchase Order" });
  }
});

app.post("/api/v1/vendor-bill", authenticateToken, async (req, res) => {
  console.log({ body: req.body });
  const newBill = new VendorBillModel({
    userId: req.user.id,
    ...req.body,
  });
  await newBill.save();
  res.status(201).json(newBill);
});

app.get("/api/v1/vendor-bills", authenticateToken, async (req, res) => {
  const bills = await VendorBillModel.find({
    userId: req.user.id,
  });
  res.json(bills);
});

app.get("/api/v1/vendor-bill/:id", authenticateToken, async (req, res) => {
  try {
    const bill = await VendorBillModel.findOne({
      _id: req.params.id,
      userId: req.user.id, // Ensure the bill belongs to the authenticated user
    });

    if (!bill) {
      return res
        .status(404)
        .json({ message: "Bill not found or unauthorized" });
    }

    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.put("/api/v1/vendor-bill/:id", authenticateToken, async (req, res) => {
  try {
    const updatedBill = await VendorBillModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // Ensure update is only applied to user's own bills
      req.body,
      { new: true }
    );

    if (!updatedBill) {
      return res
        .status(404)
        .json({ message: "Bill not found or unauthorized" });
    }

    res.json(updatedBill);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Create
app.post("/api/v1/item-info-records", authenticateToken, async (req, res) => {
  try {
    const newRecord = new ItemInfoRecordModel({
      userId: req.user.id,
      ...req.body,
    });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create item info record", details: err });
  }
});

// Update by ID
app.put("/api/v1/item-info-records/:id", authenticateToken, async (req, res) => {
  try {
    const { sourceListOverview, purchOrgData1 } = req.body;
    const fixedId = sourceListOverview?.fixedItemInfoRecordId;

    // If this record is choosing another record to be fixed
    if (fixedId) {
      // Unset the fixedItemInfoRecordId from all records with the same material
      await ItemInfoRecordModel.updateMany(
        {
          "purchOrgData1.material": purchOrgData1.material,
        },
        {
          $unset: {
            "sourceListOverview.fixedItemInfoRecordId": "",
          },
        }
      );

      // Set fixedItemInfoRecordId on the actual fixed record
      await ItemInfoRecordModel.findByIdAndUpdate(fixedId, {
        $set: {
          "sourceListOverview.fixedItemInfoRecordId": fixedId,
        },
      });
    }

    // Now update the current record (the one being edited)
    const updated = await ItemInfoRecordModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update record", details: err });
  }
});





// Get all or filtered by material
app.get("/api/v1/item-info-records", authenticateToken, async (req, res) => {
  try {
    const { material } = req.query;

    const query = { userId: req.user.id };

    // If material is provided, filter by it (stored inside purchOrgData1.material)
    if (material) {
      query['purchOrgData1.material'] = material;
    }

    const records = await ItemInfoRecordModel.find(query);
    res.status(200).json(records);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch item info records", details: err });
  }
});
app.get("/api/v1/item-info-records/material/:id", authenticateToken, async (req, res) => {
  try {
    const materialId = req.params.id; // ✅ From route params
    const query = {
      userId: req.user.id,
      'purchOrgData1.material': materialId
    };

    const records = await ItemInfoRecordModel.find(query);
    res.status(200).json(records);
  } catch (err) {
    console.error("Failed to fetch item info records by material", err);
    res.status(500).json({ error: "Failed to fetch item info records", details: err.message });
  }
});



// Get by ID
app.get(
  "/api/v1/item-info-records/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const record = await ItemInfoRecordModel.findById(req.params.id);
      if (!record) return res.status(404).json({ error: "Record not found" });
      res.status(200).json(record);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch record", details: err });
    }
  }
);



app.get("/api/v1/vendor-name/:supplierId", authenticateToken, async (req, res) => {
  try {
    const { supplierId } = req.params;

    const vendor = await VendorMasterModel.findOne({
      "vendorAddress.supplierid": supplierId,
    });
    if (!vendor || !vendor.vendorAddress?.name) {
      return res.status(404).json({ error: "Vendor not found or name missing" });
    }

    res.status(200).json({ name: vendor.vendorAddress.name });
  } catch (err) {
    res.status(500).json({ error: "Error fetching vendor name", details: err });
  }
});

app.get("/api/v1/supplier-id/:vendorName", authenticateToken, async (req, res) => {
  try {
    const { vendorName } = req.params;

    const vendor = await VendorMasterModel.findOne({
      "vendorAddress.name": vendorName,
    });

    if (!vendor || !vendor.vendorAddress?.supplierid) {
      return res.status(404).json({ error: "Supplier ID not found for this vendor" });
    }

    res.status(200).json({ supplierId: vendor.vendorAddress.supplierid });
  } catch (err) {
    res.status(500).json({ error: "Error fetching supplier ID", details: err });
  }
});


// New endpoint (optional optimization)
app.get("/api/v1/vendors-list", authenticateToken, async (req, res) => {
  try {
    const vendors = await VendorMasterModel.find(
      { userId: req.user.id },
      { _id: 1, "vendorAddress.name": 1 }
    );
    const formatted = vendors.map((v) => ({
      id: v._id,
      name: v.vendorAddress?.name || "Unnamed Vendor",
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Vendor
app.post("/api/v1/vendor-master", authenticateToken, async (req, res) => {
  try {
    const newVendor = new VendorMasterModel({
      userId: req.user.id,
      ...req.body,
    });
    await newVendor.save();
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Vendors
app.get("/api/v1/vendor-master", authenticateToken, async (req, res) => {
  try {
    const vendors = await VendorMasterModel.find({ userId: req.user.id });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Vendor by ID
app.get("/api/v1/vendor-master/:id", authenticateToken, async (req, res) => {
  try {
    const vendor = await VendorMasterModel.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!vendor)
      return res
        .status(404)
        .json({ error: "Vendor not found or unauthorized" });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Vendor
app.put("/api/v1/vendor-master/:id", authenticateToken, async (req, res) => {
  try {
    const updatedVendor = await VendorMasterModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedVendor)
      return res
        .status(404)
        .json({ error: "Vendor not found or unauthorized" });
    res.json(updatedVendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Vendor
app.delete("/api/v1/vendor-master/:id", authenticateToken, async (req, res) => {
  try {
    const vendor = await VendorMasterModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!vendor)
      return res
        .status(404)
        .json({ error: "Vendor not found or unauthorized" });
    res.json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Create a new Goods Receipt Purchase Order
app.post("/api/v1/goods-receipt", authenticateToken, async (req, res) => {
  try {
    const { purchaseOrderId, supplierId, supplierName, documentDate, items } =
      req.body;

    if (
      !purchaseOrderId ||
      !supplierId ||
      !supplierName ||
      !documentDate ||
      !items.length
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newGR = new GoodsReceiptModel({
      userId: req.user.id,
      purchaseOrderId,
      supplierId,
      supplierName,
      documentDate,
      items: items.map((item, index) => ({
        sNo: index + 1,
        materialId: item.materialId || "",
        materialName: item.materialName || "",
        movementType: item.movementType || "",
        quantityOrdered: item.quantityOrdered || 1,
        quantityReceived: item.quantityReceived || 0,
        unit: item.unit || "",
        storageLocation: item.storageLocation || "",
        batch: item.batch || "",
        movementType: item.movementType || "101",
        stockType: item.stockType || "Unrestricted",
        goodsRecipient: item.goodsRecipient || "",
        extendedAmount: item.extendedAmount || 0,
        taxCode: item.taxCode || "",
        currency: item.currency || "INR",
        deliveryNote: item.deliveryNote || "",
        plant: item.plant || "",
        unloadingPoint: item.unloadingPoint || "",
        stockSegment: item.stockSegment || "",
        valuationType: item.valuationType?.trim() || "",
      })),
    });

    await newGR.save();
    res.status(201).json({
      message: "Goods Receipt created successfully",
      goodsReceipt: newGR,
    });
  } catch (error) {
    console.error("Error creating Goods Receipt:", error.message);
    res.status(500).json({ message: "Error creating Goods Receipt" });
  }
});

// 📌 Get all Goods Receipt Purchase Orders
app.get("/api/v1/goods-receipts", authenticateToken, async (req, res) => {
  try {
    const goodsReceipts = await GoodsReceiptModel.find({ userId: req.user.id });
    res.json(goodsReceipts);
  } catch (error) {
    console.error("Error fetching Goods Receipts:", error.message);
    res.status(500).json({ message: "Error fetching Goods Receipts" });
  }
});

// 📌 Get a single Goods Receipt by ID
app.get("/api/v1/goods-receipt/:id", authenticateToken, async (req, res) => {
  try {
    const goodsReceipt = await GoodsReceiptModel.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!goodsReceipt)
      return res.status(404).json({ message: "Goods Receipt not found" });

    res.json(goodsReceipt);
  } catch (error) {
    console.error("Error fetching Goods Receipt:", error.message);
    res.status(500).json({ message: "Error fetching Goods Receipt" });
  }
});

// 📌 Update a Goods Receipt Purchase Order
app.put("/api/v1/goods-receipt/:id", authenticateToken, async (req, res) => {
  try {
    const {
      purchaseOrderId,
      supplierId,
      supplierName,
      documentDate,
      deliveryNote,
      items,
    } = req.body;

    // Validate required fields
    if (
      !purchaseOrderId ||
      !supplierId ||
      !supplierName ||
      !documentDate ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Missing or invalid required fields" });
    }

    // Validate items array structure
    const formattedItems = items.map((item, index) => ({
      sNo: index + 1,
      materialId: item.materialId?.trim() || "",
      materialName: item.materialName?.trim() || "",
      shortText: item.shortText?.trim() || "",
      movementType: item.movementType || "",
      quantityOrdered: item.quantityOrdered > 0 ? item.quantityOrdered : 1,
      quantityReceived: item.quantityReceived >= 0 ? item.quantityReceived : 0,
      unit: item.unit?.trim() || "",
      plant: item.plant?.trim() || "",
      storageLocation: item.storageLocation?.trim() || "",
      batch: item.batch?.trim() || "",
      stockSegment: item.stockSegment?.trim() || "",
      movementType: item.movementType?.trim() || "101",
      stockType: item.stockType?.trim() || "Unrestricted",
      goodsRecipient: item.goodsRecipient?.trim() || "",
      unloadingPoint: item.unloadingPoint?.trim() || "",
      valuationType: item.valuationType?.trim() || "",
      extendedAmount: item.extendedAmount >= 0 ? item.extendedAmount : 0,
      taxCode: item.taxCode?.trim() || "",
      deliveryNote: item.deliveryNote || "",
      currency: item.currency?.trim() || "INR",
      itemOK: item.itemOK !== undefined ? item.itemOK : true,
    }));

    // Update the Goods Receipt
    const updatedGR = await GoodsReceiptModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        $set: {
          purchaseOrderId,
          supplierId,
          supplierName,
          documentDate,
          items: formattedItems,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedGR) {
      return res.status(404).json({ message: "Goods Receipt not found" });
    }

    res.status(200).json({
      message: "Goods Receipt updated successfully",
      goodsReceipt: updatedGR,
    });
  } catch (error) {
    console.error("Error updating Goods Receipt:", error);
    res
      .status(500)
      .json({ message: "Server error while updating Goods Receipt" });
  }
});

app.post("/api/v1/inbound-deliveries", authenticateToken, async (req, res) => {
  try {
    const { supplierId, supplierName, documentDate, items } = req.body;

    if (!supplierId || !supplierName || !documentDate || !items.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newInboundDelivery = new InboundDeliveryModel({
      userId: req.user.id,
      supplierId,
      supplierName,
      documentDate,
      items: items.map((item, index) => ({
        sNo: index + 1,
        materialId: item.materialId || "",
        materialName: item.materialName || "",
        deliveryQuantity: item.deliveryQuantity || 1,
        unit: item.unit || "",
        storageLocation: item.storageLocation || "",
        supplierBatch: item.supplierBatch || "",
        grossWeight: item.grossWeight || "",
        volume: item.volume || "",
        warehouseNo: item.warehouseNo || "",
        referenceDocument: item.referenceDocument || "",
        putawayQty: item.putawayQty || 0,
      })),
    });

    await newInboundDelivery.save();
    res.status(201).json({
      message: "Inbound Delivery created successfully",
      inboundDelivery: newInboundDelivery,
    });
  } catch (error) {
    console.error("Error creating Inbound Delivery:", error.message);
    res.status(500).json({ message: "Error creating Inbound Delivery" });
  }
});

app.get("/api/v1/inbound-deliveries", authenticateToken, async (req, res) => {
  try {
    const inboundDeliveries = await InboundDeliveryModel.find({
      userId: req.user.id,
    });
    res.json(inboundDeliveries);
  } catch (error) {
    console.error("Error fetching Inbound Deliveries:", error.message);
    res.status(500).json({ message: "Error fetching Inbound Deliveries" });
  }
});

app.get(
  "/api/v1/inbound-deliveries/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const inboundDelivery = await InboundDeliveryModel.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });

      if (!inboundDelivery)
        return res.status(404).json({ message: "Inbound Delivery not found" });

      res.json(inboundDelivery);
    } catch (error) {
      console.error("Error fetching Inbound Delivery:", error.message);
      res.status(500).json({ message: "Error fetching Inbound Delivery" });
    }
  }
);

app.put(
  "/api/v1/inbound-deliveries/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { supplierId, supplierName, documentDate, items } = req.body;

      if (!supplierId || !supplierName || !documentDate || !items.length) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const updatedInboundDelivery =
        await InboundDeliveryModel.findOneAndUpdate(
          { _id: req.params.id, userId: req.user.id },
          {
            supplierId,
            supplierName,
            documentDate,
            items: items.map((item, index) => ({
              sNo: index + 1,
              materialId: item.materialId || "",
              materialName: item.materialName || "",
              deliveryQuantity: item.deliveryQuantity || 1,
              unit: item.unit || "",
              storageLocation: item.storageLocation || "",
              supplierBatch: item.supplierBatch || "",
              grossWeight: item.grossWeight || "",
              volume: item.volume || "",
              warehouseNo: item.warehouseNo || "",
              referenceDocument: item.referenceDocument || "",
              putawayQty: item.putawayQty || 0,
            })),
          },
          { new: true }
        );

      if (!updatedInboundDelivery)
        return res.status(404).json({ message: "Inbound Delivery not found" });

      res.status(200).json({
        message: "Inbound Delivery updated successfully",
        inboundDelivery: updatedInboundDelivery,
      });
    } catch (error) {
      console.error("Error updating Inbound Delivery:", error.message);
      res.status(500).json({ message: "Error updating Inbound Delivery" });
    }
  }
);

app.get(
  "/api/v1/distributor/inventory",
  authenticateToken,
  async (req, res) => {
    try {
      // Find the distributor associated with the logged-in user
      const distributor = await DistributorModel.findOne({
        userId: req.user.id,
      });

      if (!distributor) {
        return res.status(404).json({ message: "Distributor not found" });
      }

      // Create a map of productId to price (consider updatedPrice first, then fallback to price)
      const productPriceMap = distributor.products.reduce((map, product) => {
        map[product.productId.toString()] =
          product.updatedPrice || product.price; // Prefer updatedPrice, fallback to price
        return map;
      }, {});

      // Flatten the inventory data for all warehouses and map prices from productPriceMap
      const inventoryPromises = distributor.warehouses.flatMap((warehouse) =>
        warehouse.inventory.map(async (item) => {
          // Get the price from the productPriceMap (updatedPrice or price)
          let price = item.newPrice || productPriceMap[item.productId];

          // If price is not found in the distributor model, fetch from ProductModel
          if (!price) {
            const product = await ProductModel.findOne({
              productId: item.productId,
            });
            price = product?.price || 0; // Fallback to 0 if no price found in ProductModel
          }

          return {
            _id: item._id,
            productId: item.productId,
            productName: item.productId, // Use the productName from distributor's inventory
            warehouseId: warehouse._id,
            warehouseName: warehouse.city,
            warehouseLocation: warehouse.addressLine1,
            quantity: item.quantity,
            price: price, // Use the price from the map or ProductModel
            minimumStock: item.minimumStock || 0, // Default to 0 if not set
            reorderPoint: item.reorderPoint || 0, // Default to 0 if not set
          };
        })
      );

      // Wait for all promises to resolve before sending the response
      const inventory = await Promise.all(inventoryPromises);

      // Return the inventory data
      res.status(200).json(inventory);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch inventory", error: error.message });
    }
  }
);

// Update Price for Product in Distributor
app.post(
  "/api/v1/distributor/update-price",
  authenticateToken,
  async (req, res) => {
    const { productId, warehouseId, newPrice } = req.body;

    try {
      // Find the distributor associated with the logged-in user
      const distributor = await DistributorModel.findOne({
        userId: req.user.id,
      });

      if (!distributor) {
        return res.status(404).json({ message: "Distributor not found" });
      }

      // Find the warehouse containing the inventory
      const warehouse = distributor.warehouses.id(warehouseId);
      if (!warehouse) {
        return res.status(404).json({ message: "Warehouse not found" });
      }

      // Find the product in the warehouse's inventory
      const inventoryItem = warehouse.inventory.find(
        (item) => item.productId === productId
      );
      if (!inventoryItem) {
        return res
          .status(404)
          .json({ message: "Product not found in warehouse" });
      }

      // Update the newPrice in the inventory item if it differs from the existing one
      if (inventoryItem.newPrice !== newPrice) {
        inventoryItem.newPrice = newPrice;
      }

      // Save the distributor with the updated price in the warehouse inventory
      await distributor.save();

      // Respond with the updated inventory
      res
        .status(200)
        .json({ message: "Price updated successfully", distributor });
    } catch (error) {
      console.error("Error updating price:", error);
      res
        .status(500)
        .json({ message: "Failed to update price", error: error.message });
    }
  }
);

app.get("/api/v1/inventories", authenticateToken, async (req, res) => {
  try {
    const distributor = await DistributorModel.findOne({ userId: req.user.id });
    res.status(200).json(distributor);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch inventory", error: error.message });
  }
});

app.post("/api/v1/inventories", authenticateToken, async (req, res) => {
  const { inventoryOrders, orderedItems, disWarehouses } = req.body;
  // console.log("INVENTORIES", inventoryOrders)
  // console.log("CONSUMERS", orderedItems)

  try {
    if (
      !orderedItems ||
      orderedItems.length === 0 ||
      disWarehouses.length === 0 ||
      !disWarehouses
    ) {
      return res.status(400).json({
        message: "Consumer Order and Warehouse details are required!",
      });
    }

    let { warehouses } = disWarehouses;
    warehouses.sort((a, b) => b.isPrimary - a.isPrimary);

    let deductedProducts = []; // Stores deducted products and their warehouse info
    let insufficientStockProducts = []; // Stores products with insufficient stock

    for (let orderItem of orderedItems) {
      const { product, name, quantity } = orderItem; // Extract productName
      let remainingQuantity = quantity;
      let deductedFromWarehouses = [];
      let insufficientWarehouses = []; // Track which warehouses had insufficient stock

      for (let warehouse of warehouses) {
        if (remainingQuantity === 0) break;

        let productIndex = warehouse.inventory.findIndex(
          (p) => p.productId === product
        );

        if (productIndex !== -1) {
          let availableQuantity = warehouse.inventory[productIndex].quantity;
          let deductedQuantity = Math.min(availableQuantity, remainingQuantity);

          if (deductedQuantity > 0) {
            warehouse.inventory[productIndex].quantity -= deductedQuantity;
            remainingQuantity -= deductedQuantity;

            // Track the warehouse from which stock was deducted
            deductedFromWarehouses.push({
              warehouseId: warehouse._id,
              warehouseLocation: `${warehouse.addressLine1}, ${warehouse.city}`,
              deductedQuantity,
            });
          }

          // If the product is still needed but the warehouse has 0 stock, mark it as insufficient
          if (remainingQuantity > 0 && availableQuantity === 0) {
            insufficientWarehouses.push({
              warehouseId: warehouse._id,
              warehouseLocation: `${warehouse.addressLine1}, ${warehouse.city}`,
            });
          }
        }
      }

      // If stock was deducted, add to deductedProducts array
      if (deductedFromWarehouses.length > 0) {
        deductedProducts.push({
          productId: product,
          productName: name, // Include product name
          orderedQuantity: quantity,
          deductedFrom: deductedFromWarehouses,
        });
      }

      // If order couldn't be fully fulfilled, add to insufficientStockProducts array
      if (remainingQuantity > 0) {
        insufficientStockProducts.push({
          productId: product,
          productName: name, // Include product name
          orderedQuantity: quantity,
          availableQuantity: quantity - remainingQuantity, // Amount that could be fulfilled
          insufficientFrom: insufficientWarehouses, // Track where stock was insufficient
        });
      }
    }

    // Add insufficient products to disWarehouses
    disWarehouses.insufficientStockProducts = insufficientStockProducts;

    // Update the warehouse data in MongoDB
    await DistributorModel.findByIdAndUpdate(disWarehouses._id, {
      warehouses,
      insufficientStockProducts,
    });

    console.log("Deducted Products:", deductedProducts);
    console.log("Insufficient Stock Products:", insufficientStockProducts);

    res.json({
      message:
        insufficientStockProducts.length > 0
          ? "Order partially fulfilled, some products have insufficient stock"
          : "Order fulfilled successfully",
      deductedProducts,
      insufficientStockProducts,
      updatedWarehouses: warehouses,
      success: true,
    });
  } catch (error) {
    console.error("Error updating inventory:", error);
    res
      .status(500)
      .json({ message: "Failed to update inventory", error: error.message });
  }
});

app.post(
  "/warehouses/:warehouseId/products",
  authenticateToken,
  async (req, res) => {
    try {
      const { warehouseId } = req.params;
      const { productId, quantity } = req.body;

      // Validate input
      if (!productId || !quantity || quantity <= 0) {
        return res
          .status(400)
          .json({ message: "Invalid productId or quantity" });
      }

      // Find the distributor that contains the warehouse
      const distributor = await DistributorModel.findOne({
        "warehouses._id": warehouseId,
      });
      if (!distributor) {
        return res.status(404).json({ message: "Warehouse not found" });
      }

      // Find the specific warehouse within the distributor
      const warehouse = distributor.warehouses.find(
        (warehouse) => warehouse._id.toString() === warehouseId
      );

      if (!warehouse) {
        return res.status(404).json({ message: "Warehouse not found" });
      }

      // Check if the product already exists in the warehouse
      const productInWarehouse = warehouse.inventory.find(
        (inv) => inv.productId.toString() === productId
      );

      if (productInWarehouse) {
        // If the product exists, update the quantity
        productInWarehouse.quantity += quantity;
      } else {
        // If the product doesn't exist, add it to the warehouse inventory
        warehouse.inventory.push({ productId, quantity });
      }

      // Save the updated distributor
      await distributor.save();

      // Return success response
      res
        .status(200)
        .json({ message: "Product added to warehouse", warehouse });
    } catch (error) {
      console.error("Error adding product to warehouse:", error);

      // Handle specific errors
      if (error.name === "CastError") {
        return res
          .status(400)
          .json({ message: "Invalid warehouseId or productId" });
      }

      // Generic error response
      res.status(500).json({
        message: "Failed to add product to warehouse",
        error: error.message,
      });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running Successfully`);
});
