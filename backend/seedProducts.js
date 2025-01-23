const mongoose = require("mongoose");
const Product = require("./Models/ProductModel"); // adjust the path as needed

// MongoDB connection URI - replace with your actual URI
const MONGODB_URI = "mongodb://127.0.0.1:27017/Visionsoft";

// Sample product data
const salts = require("./data/salts");
const medicines = require("./data/medicines");
const fries = require("./data/fries");
const chocolates = require("./data/chocolates");

// Combine all product arrays
const allProducts = [...salts, ...medicines, ...fries, ...chocolates].map(
  (product) => ({
    ...product,
    quantity: 1000, // Adding default quantity as per your schema
  })
);

// Function to seed the database
async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");

    // Delete existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert new products
    const insertedProducts = await Product.insertMany(allProducts);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    // Log some statistics
    const categoryCounts = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    console.log("\nProducts by category:");
    console.table(categoryCounts);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the seeder
seedProducts();
