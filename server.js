/**
 * server.js - Entry Point
 */
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");
const { watchOrders } = require("./services/changeStream");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// API Routes
app.use("/api/orders", orderRoutes);

// Create HTTP + WebSocket server
const server = http.createServer(app);
const io = new Server(server);

// Socket connection
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  await watchOrders(io); // Start watching MongoDB changes
});
