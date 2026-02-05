const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { id, name, status } = req.body;

    if (id) {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, status },
        { new: true, runValidators: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      return res.status(200).json(updatedCategory);
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category already exists" });
    }

    const newCategory = await Category.create({
      name,
      status,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



router.get("/", async (req, res) => {
    console.log("Fetching categories...");
  try {
    const categories = await Category.find();
    console.log("Categories fetched:", categories);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({
      message: "Category deleted successfully",
      id: deletedCategory._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
