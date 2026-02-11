import dotenv from "dotenv";
dotenv.config();
import "./config/cloudinary.js";
import mongoose from "mongoose";
import app from "./app.js";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });

    console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
    console.log("API SECRET:", process.env.CLOUDINARY_API_SECRET);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
