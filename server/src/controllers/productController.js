import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

/* ================= CREATE PRODUCT ================= */
export const createProduct = async (req, res) => {
    try {
        console.log("📦 Create Product Request");
        console.log("Body:", req.body);
        console.log("Files:", req.files);

        const {
            name,
            price,
            stock,
            description,
            categories,
        } = req.body;

        // Validate required fields
        if (!name || !price) {
            return res.status(400).json({ 
                message: "Name and price are required" 
            });
        }

        // Parse categories if it's a string
        let parsedCategories = categories;
        if (typeof categories === 'string') {
            try {
                parsedCategories = JSON.parse(categories);
            } catch (e) {
                parsedCategories = categories.split(',').filter(Boolean);
            }
        }

        // Images from Cloudinary
        const images = req.files?.map((file) => ({
            url: file.path,        // Cloudinary URL
            public_id: file.filename, // Cloudinary public_id
        })) || [];

        console.log("✅ Processed images:", images);

        const product = await Product.create({
            name,
            price: Number(price),
            stock: Number(stock) || 0,
            description,
            categories: parsedCategories,
            images,
        });

        console.log("✅ Product created:", product._id);
        res.status(201).json(product);
    } catch (error) {
        console.error("❌ Create Product Error:", error);
        res.status(400).json({ 
            message: error.message,
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};

/* ================= GET ALL PRODUCTS ================= */
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("categories", "name")
            .sort({ createdAt: -1 });

        console.log(`📋 Fetched ${products.length} products`);
        res.json(products);
    } catch (error) {
        console.error("❌ Get Products Error:", error);
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

        console.log(`📦 Fetched product: ${product.name}`);
        res.json(product);
    } catch (error) {
        console.error("❌ Get Product Error:", error);
        res.status(500).json({ message: error.message });
    }
};

/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res) => {
    try {
        console.log("🔄 Update Product Request");
        console.log("Product ID:", req.params.id);
        console.log("Body:", req.body);
        console.log("Files:", req.files);

        const {
            name,
            price,
            stock,
            status,
            description,
            categories,
            removeImages, // Array of public_ids to remove
        } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Parse categories if it's a string
        let parsedCategories = categories;
        if (typeof categories === 'string') {
            try {
                parsedCategories = JSON.parse(categories);
            } catch (e) {
                parsedCategories = categories.split(',').filter(Boolean);
            }
        }

        // Remove old images if requested
        if (removeImages) {
            const imagesToRemove = typeof removeImages === 'string' 
                ? JSON.parse(removeImages) 
                : removeImages;

            for (const public_id of imagesToRemove) {
                try {
                    await cloudinary.uploader.destroy(public_id);
                    console.log(`🗑️ Deleted image: ${public_id}`);
                } catch (err) {
                    console.error(`❌ Failed to delete image ${public_id}:`, err);
                }
            }

            // Remove from product
            product.images = product.images.filter(
                img => !imagesToRemove.includes(img.public_id)
            );
        }

        // Add new images
        const newImages = req.files?.map((file) => ({
            url: file.path,
            public_id: file.filename,
        })) || [];

        if (newImages.length) {
            product.images.push(...newImages);
            console.log(`➕ Added ${newImages.length} new images`);
        }

        // Update fields
        if (name) product.name = name;
        if (price) product.price = Number(price);
        if (stock !== undefined) product.stock = Number(stock);
        if (status) product.status = status;
        if (description !== undefined) product.description = description;
        if (parsedCategories) product.categories = parsedCategories;

        await product.save();
        console.log("✅ Product updated:", product._id);
        
        const updatedProduct = await Product.findById(product._id)
            .populate("categories", "name");
        
        res.json(updatedProduct);
    } catch (error) {
        console.error("❌ Update Product Error:", error);
        res.status(400).json({ 
            message: error.message,
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req, res) => {
    try {
        console.log("🗑️ Delete Product Request");
        console.log("Product ID:", req.params.id);

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete images from Cloudinary
        for (const img of product.images) {
            try {
                await cloudinary.uploader.destroy(img.public_id);
                console.log(`🗑️ Deleted image: ${img.public_id}`);
            } catch (err) {
                console.error(`❌ Failed to delete image ${img.public_id}:`, err);
            }
        }

        await product.deleteOne();
        console.log("✅ Product deleted successfully");
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("❌ Delete Product Error:", error);
        res.status(500).json({ message: error.message });
    }
};