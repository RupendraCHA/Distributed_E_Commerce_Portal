const fs = require("fs");
const { MongoClient, ObjectId } = require("mongodb");

async function importGLDocumentData(
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

// Config
const uri =
  "mongodb+srv://githubdevelopment:Rvsoft1234@cluster0.nqiv3.mongodb.net/Visionsoft";
const databaseName = "Visionsoft";
const collectionName = "gldocumentdata";
const filePath = "GL_Document_Data.json";

importGLDocumentData(uri, databaseName, collectionName, filePath);
