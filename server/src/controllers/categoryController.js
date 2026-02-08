import Category from "../models/Category.js";

/* ================= CREATE CATEGORY ================= */
export const createCategory = async ({ name, status }) => {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
        throw new Error("Category already exists");
    }

    return await Category.create({ name, status });
};

/* ================= GET ALL CATEGORIES ================= */
export const getAllCategories = async () => {
    return await Category.find();
};

/* ================= UPDATE CATEGORY ================= */
export const updateCategory = async (id, data) => {
    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );

    if (!updatedCategory) {
        throw new Error("Category not found");
    }

    return updatedCategory;
};

/* ================= DELETE CATEGORY ================= */
export const deleteCategory = async (id) => {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
        throw new Error("Category not found");
    }

    return deletedCategory;
};
