const { MongoClient } = require("mongodb");
require("dotenv").config();

let db;

async function connectDB() {
  if (db) return db;

  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  db = client.db();
  console.log("✅ Connected to MongoDB Atlas");
  return db;
}

module.exports = connectDB;
