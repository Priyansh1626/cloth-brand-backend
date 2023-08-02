const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const schema = {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already present"],
        validate(v) {
            if (!validator.isEmail(v)) {
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        min: [4, "min length 4 required"]
    },
    phone: {
        type: String,
        required: true,
        min: [10, "number must be of 10 numbers"],
        max: [10, "number cannot exceed 10 numbers"],
        unique: [true, "Phone number is already present"]
    },
    userImg: {
        type: String,
    },
    tokens: [{
        token: {
            type: String,
        },
        date: {
            type: String,
            default: function () {
                const timeElapsed = Date.now()
                const today = new Date(timeElapsed);
                return today.toUTCString();
            }
        }
    }],
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserWithAddress",
    },
    orders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserOrder",
    }
}

const userSchema = new mongoose.Schema(schema,
    {
        timestamps: true
    });

userSchema.methods.generateAuthToken = async function () {
    try {
        const user = this
        const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_KEY);
        user.tokens = user.tokens.concat({ token })
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

// securing password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const newUserModel = new mongoose.model("User", userSchema);

module.exports = newUserModel;