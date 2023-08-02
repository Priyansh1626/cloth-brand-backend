const mongoose = require("mongoose");

const schema = {
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cloth",
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    popularityOfCategory: {
        type: Number,
    },
    popularityOfSubCategory: {
        type: Number,
    },
}

const productSchema = new mongoose.Schema(schema, {
    timestamps: true,
});

const clothCategoryModel = new mongoose.model("ClothCategory", productSchema);

module.exports = clothCategoryModel;