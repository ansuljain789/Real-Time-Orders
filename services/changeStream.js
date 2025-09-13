const { getOrderCollection } = require("../models/orderModel");

async function watchOrders(io) {
  const orders = await getOrderCollection();
  const changeStream = orders.watch([], { fullDocument: "updateLookup" });


  changeStream.on("change", (change) => {
 
    if (change.documentKey?._id) change.documentKey._id = change.documentKey._id.toString();
    if (change.fullDocument?._id) change.fullDocument._id = change.fullDocument._id.toString();

    io.emit("orderChange", change);
    console.log("📢 Change detected and emitted:", change.operationType);
  });


}

module.exports = { watchOrders };