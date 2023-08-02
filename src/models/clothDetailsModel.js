const mongoose = require("mongoose");

const schema = {
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cloth",
    },
    availableQnt: {
        type: Number,
        min: [0, "Quantity cannot be negative"]
    },
    sizes: [
        {
            size: {
                type: String,
            },
            isAvail: {
                type: Boolean,
            },
            totalQnt: {
                type: Number,
                required: true
            },
            availableQnt: {
                type: Number,
                min: [0, "Quantity cannot be negative"]
            },
        }
    ],
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