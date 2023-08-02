const mongoose = require("mongoose");

const schema = {
    id: {
        type: Number,
        required: true,
        unique: [true, "All products must have a unique id"]
    },
    despciptaion: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPercent: {
        type: Number,
        required: true,
    },
    img: [{
        type: String,
        required: true,
        unique: [true, "Img must be unique so that products can be identified"]
    }],
    clothDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"ClothDetail"
    },
    clothCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"ClothCategory"
    }
}

const productSchema = new mongoose.Schema(schema, {
    timestamps: true,
});

const newClothModel = new mongoose.model("Cloth", productSchema);

module.exports = newClothModel;