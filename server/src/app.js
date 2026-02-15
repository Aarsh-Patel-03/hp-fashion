import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

export default app;
