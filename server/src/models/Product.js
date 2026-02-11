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

        status: { type: String, default: "active" },

        images: [
            {
                url: String,
                public_id: String,
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
