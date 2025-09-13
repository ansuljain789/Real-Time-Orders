const { ObjectId } = require("mongodb");
const { getOrderCollection } = require("../models/orderModel");

//create new order
async function createOrder(req, res) {
  try {
    const orders = await getOrderCollection();
    const result = await orders.insertOne(req.body);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
}

///getting all order
async function getOrders(req, res) {
  try {
    const orders = await getOrderCollection();
    const result = await orders.find().toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}

// updating an order
async function updateOrder(req, res) {
  try {
    const orders = await getOrderCollection();
    const { id } = req.params;
    const result = await orders.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );
    res.json({ modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to update order" });
  }
}

/// deleting an order
async function deleteOrder(req, res) {
  try {
    const orders = await getOrderCollection();
    const { id } = req.params;
    const result = await orders.deleteOne({ _id: new ObjectId(id) });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete order" });
  }
}

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};