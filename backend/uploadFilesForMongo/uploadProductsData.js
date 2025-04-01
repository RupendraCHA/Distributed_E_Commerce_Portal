const fs = require("fs");
const { MongoClient, ObjectId } = require("mongodb");

async function importMissingProducts(
  uri,
  databaseName,
  collectionName,
  filePath
) {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Add _id to each document
    const documentsWithIds = data.map((doc) => ({
      ...doc,
      _id: new ObjectId(),
    }));

    const result = await collection.insertMany(documentsWithIds);

    console.log(`${result.insertedCount} documents inserted successfully.`);
  } catch (error) {
    console.error("An error occurred during import:", error);
  } finally {
    await client.close();
  }
}

// Replace with your actual values
const uri =
  "mongodb+srv://githubdevelopment:Rvsoft1234@cluster0.nqiv3.mongodb.net/Visionsoft";
const databaseName = "Visionsoft"; // Replace with your database name
const collectionName = "iteminforecords"; // Replace with your collection name
const filePath = "missing_products.json";

importMissingProducts(uri, databaseName, collectionName, filePath);
