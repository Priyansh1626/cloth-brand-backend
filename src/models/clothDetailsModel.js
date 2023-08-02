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
    totalQnt: {
        type: Number,
        required: true
    },
    availableQnt: {
        type: Number,
        min: [0, "Quantity cannot be negative"]
    },
    date: {
        type: String,
        default: function () {
            const timeElapsed = Date.now()
            const today = new Date(timeElapsed);
            return today.toUTCString();
        }
    }
}

const productSchema = new mongoose.Schema(schema, {
    timestamps: true,
});

const clothDetailModel = new mongoose.model("ClothDetail", productSchema);

module.exports = clothDetailModel;