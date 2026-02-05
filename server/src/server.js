const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryRoutes = require("./routes/CategoryRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// 🔹 Routes
app.use("/api/categories", categoryRoutes);


app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
