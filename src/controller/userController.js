const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const newUserModel = require("../models/newUserModel");
const userAddressModel = require("../models/userAddressModel");
const userOrderModel = require("../models/userOrderModel");
const { response } = require("express");
const mongoose = require("mongoose");

const userSignin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await newUserModel.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = await user.generateAuthToken();
                // creating cookie
                res.cookie('jwt', token, {
                    httpOnly: true,
                    secure: true,
                });

                res.send({ message: "Signin successful", user: user, cookie: req.cookies.jwt });
            } else {
                res.status(401).send({ message: "Invalid credentials" });
            }
        } else {
            res.status(401).send({ message: "User not found" });
        }
    } catch (error) {
        res.send({ message: "server error", error }).status(404);
    }
})

const userSignup = asyncHandler(async (req, res) => {
    const { email, password, phone, userImg, name } = req.body;

    try {
        const user = await newUserModel.findOne({ email });
        if (!user) {
            try {
                const user = new newUserModel({ email, password, phone, userImg, name });
                const token = await user.generateAuthToken();
                res.cookie("jwt", token, { httpOnly: true, SameSite: false });

                const createUser = await user.save();
                res.send({ newUser: createUser, message: "successfully regestered user" }).status(201);

            } catch (error) {
                res.send({ message: "connot regester the user please try again" }).status(402);
            }
        } else {
            res.send({
                message: "User already regestered",
                id: user.id
            });
        }
    } catch (error) {
        res.send({ message: "server error", error }).status(404);
    }
})

const signout = asyncHandler(async (req, res) => {
    try {
        res.clearCookie("jwt");

        //logout only from single device
        req.user.tokens = req.user.tokens.filter((currElm) => {
            return currElm.token !== req.token;
        })

        await req.user.save();
        res.send({ message: "logedout successfully" }).status(200);
    } catch (error) {
        res.send({ message: "server error", error }).status(500);
    }
});

const isUser = asyncHandler(async (req, res) => {
    if (req.user) {
        res.send({ user: req.user }).status(201);
    } else {
        res.send({ message: "User loged out please login again" }).status(201);
    }
});

const addAddress = asyncHandler(async (req, res) => {
    const { locality, city, state, id } = req.body;

    let details = {
        // user: req.user._id,
        user: id,
        address: [{ locality, city, state }]
    }

    try {
        const user = await userAddressModel.findOne({ user: { $eq: id } });
        if (user) {
            user.address = user.address.concat({ locality, city, state });
            await user.save();
            res.send(user).status(201);

        } else {
            let newAddress = await userAddressModel.create(details);
            newAddress = await newAddress.populate("user", "-_id name email phone");
 
            console.log(newAddress);
            res.send(newAddress).status(201);
        }

    } catch (error) {
        res.send({ message: "server error", error }).status(500);
    }
})

const placeOrder = asyncHandler(async (req, res) => {
    const { paymentId, amount, order, locality, city, state, id } = req.body;

    let details = {
        user: id,
        orders: [{
            paymentId, amount, order, address: [{
                locality, city, state
            }]
        }]
    }

    try {
        const user = await userOrderModel.findOne({ user: { $eq: id } });
        if (user) {
            user.orders = user.orders.concat({
                paymentId, amount, order, address: [{
                    locality, city, state
                }]
            });
            await user.save();
            res.send(user).status(201);
        } else {
            let newOrder = await userOrderModel.create(details);
            newOrder = await userOrderModel.populate("user", "name email phone");
            res.send(newOrder).status(201);
        }

        res.send(newOrder).status(201);

    } catch (error) {
        res.send({ message: "server error", error }).status(500);
    }
})

module.exports = {
    userSignup,
    userSignin,
    signout,
    isUser,
    addAddress,
    placeOrder
}
