const express = require("express");
const router = new express.Router();
const auth = require("../middleware/authenticateUser");

const { userSignup,
    userSignin, signout, isUser , addAddress , placeOrder } = require("../controller/userController");

router.post("/signup", userSignup);

router.post("/signin", userSignin);

router.get("/signout", auth, signout);

router.get("/isuser", auth, isUser)

router.post("/addaddress", addAddress);

router.post("/placeorder", auth, placeOrder);

module.exports = router;