import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: String,
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },

        categories: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        ],

        images: [
            {
                url: String,
                public_id: String,
            },
        ],

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
