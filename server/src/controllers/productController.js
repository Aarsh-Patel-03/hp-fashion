import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

/* ================= CREATE PRODUCT ================= */
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            stock,
            status,
            description,
            categories,
        } = req.body;

        // Images from Cloudinary
        const images =
            req.files?.map((file) => ({
                url: file.path,        // Cloudinary URL
                public_id: file.filename, // Cloudinary public_id
            })) || [];
        const product = await Product.create({
            name,
            price,
            stock,
            status,
            description,
            categories,
            images,
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/* ================= GET ALL PRODUCTS ================= */
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("categories", "name")
            .sort({ createdAt: -1 });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ================= GET SINGLE PRODUCT ================= */
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("categories", "name");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            stock,
            status,
            description,
            categories,
        } = req.body;

        const newImages =
            req.files?.map((file) => ({
                url: file.path,
                public_id: file.filename,
            })) || [];

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update fields
        product.name = name;
        product.price = price;
        product.stock = stock;
        product.status = status;
        product.description = description;
        product.categories = categories;

        // Append new images (do NOT remove old ones)
        if (newImages.length) {
            product.images.push(...newImages);
        }

        await product.save();
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // 🔥 Delete images from Cloudinary
        for (const img of product.images) {
            await cloudinary.uploader.destroy(img.public_id);
        }

        await product.deleteOne();
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
