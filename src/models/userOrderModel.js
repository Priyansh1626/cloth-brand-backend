const mongoose = require("mongoose");

const schema = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    orders: [{
        paymentId: {
            type: String
        },
        amount: {
            type: Number
        },
        order: {
            type: Array
        },
        address: [
            {
                locality: {
                    type: String,
                },
                city: {
                    type: String,
                },
                state: {
                    type: String,
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
    }],
}

const userDeailSchema = new mongoose.Schema(schema,
    {
        timestamps: true
    });

const userOrderModel = new mongoose.model("UserOrder", userDeailSchema);

module.exports = userOrderModel;