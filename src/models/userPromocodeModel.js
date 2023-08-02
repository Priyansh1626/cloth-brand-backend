const mongoose = require("mongoose");

const schema = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    promocode: {
        type: String,
        undefined: true,
    },
    promocodeUsedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
}

const userDeailSchema = new mongoose.Schema(schema,
    {
        timestamps: true
    });

const userPromocodeModel = new mongoose.model("UserPromocode", userDeailSchema);

module.exports = userPromocodeModel;