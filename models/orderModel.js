
const connectDB = require("../config/db");

async function getOrderCollection() {
  const db = await connectDB();
  return db.collection("orders");
}

module.exports = { getOrderCollection };
