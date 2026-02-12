import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

/* =========================================================
   UPSERT PRODUCT (CREATE + UPDATE)
========================================================= */
export const upsertProduct = async (req, res) => {
  try {
    console.log("📦 Upsert Product Request");
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const {
      _id,
      name,
      price,
      stock,
      description,
      categories,
      imagesToKeep,
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        message: "Name and price are required",
      });
    }

    /* ================= PARSE CATEGORIES ================= */
    let parsedCategories = categories;

    if (typeof categories === "string") {
      parsedCategories = [categories];
    }

    if (Array.isArray(categories)) {
      parsedCategories = categories;
    }

    /* ================= HANDLE NEW IMAGES ================= */
    const newImages =
      req.files?.map((file) => ({
        url: file.path,
        public_id: file.filename,
      })) || [];

    /* =========================================================
       UPDATE PRODUCT
    ========================================================= */
    if (_id && _id !== "") {
      const product = await Product.findById(_id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      /* -------- Parse imagesToKeep properly -------- */
      let keepList = imagesToKeep || [];

      if (typeof keepList === "string") {
        keepList = [keepList];
      }

      if (!Array.isArray(keepList)) {
        keepList = [];
      }

      /* -------- Find removed images -------- */
      const removedImages = product.images.filter(
        (img) => !keepList.includes(img.public_id)
      );

      /* -------- Delete removed images from Cloudinary -------- */
      for (const img of removedImages) {
        try {
          await cloudinary.uploader.destroy(img.public_id);
          console.log("🗑 Deleted:", img.public_id);
        } catch (err) {
          console.error("Cloudinary delete error:", err);
        }
      }

      /* -------- Keep selected images -------- */
      const keptImages = product.images.filter((img) =>
        keepList.includes(img.public_id)
      );

      /* -------- Merge kept + new -------- */
      product.images = [...keptImages, ...newImages];

      /* -------- Update fields -------- */
      product.name = name;
      product.price = Number(price);
      product.stock = Number(stock) || 0;
      product.description = description;
      product.categories = parsedCategories;

      await product.save();

      const updatedProduct = await Product.findById(product._id)
        .populate("categories", "name");

      console.log("✅ Product Updated:", product._id);
      return res.json(updatedProduct);
    }

    /* =========================================================
       CREATE PRODUCT
    ========================================================= */
    const product = await Product.create({
      name,
      price: Number(price),
      stock: Number(stock) || 0,
      description,
      categories: parsedCategories,
      images: newImages,
    });

    console.log("✅ Product Created:", product._id);
    res.status(201).json(product);

  } catch (error) {
    console.error("❌ Upsert Product Error:", error);
    res.status(400).json({
      message: error.message,
    });
  }
};

/* =========================================================
   GET ALL PRODUCTS
========================================================= */
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

/* =========================================================
   GET SINGLE PRODUCT
========================================================= */
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

/* =========================================================
   DELETE PRODUCT
========================================================= */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
