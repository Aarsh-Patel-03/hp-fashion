import express from "express";
import { upload } from "../middleware/upload.js";
import {
    upsertProduct,
    getProducts,
    getProductById,
    deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", upload.array("images", 5), upsertProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
