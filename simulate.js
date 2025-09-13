const axios = require("axios");

const API_URL = "http://localhost:3000/api/orders";

async function runSimulation() {
  try {

    const insert = await axios.post(API_URL, {
      customer_name: "John Doe",
      product_name: "Smartphone",
      status: "pending",
    });
    const orderId = insert.data.insertedId;
    console.log("Inserted:", insert.data);

    await new Promise(r => setTimeout(r, 2000));

    // 2️⃣ Update order
    const update = await axios.put(`${API_URL}/${orderId}`, { status: "shipped" });
    console.log("Updated:", update.data);

    await new Promise(r => setTimeout(r, 2000));

    // 3️⃣ Delete order
    const del = await axios.delete(`${API_URL}/${orderId}`);
    console.log("Deleted:", del.data);

  } catch (err) {
    console.error("Simulation error:", err.response ? err.response.data : err.message);
  }
}

runSimulation();
