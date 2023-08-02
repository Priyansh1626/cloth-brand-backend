const mongoose = require("mongoose");

const schema = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    address: [
        {
            locality: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
        }
    ]
}

const userDeailSchema = new mongoose.Schema(schema,
    {
        timestamps: true
    });

const userAddressModel = new mongoose.model("UserWithAddress", userDeailSchema);

module.exports = userAddressModel;