const express = require("express");
const router = new express.Router();
const auth = require("../middleware/authenticateUser");

const { getAllCloths,
    newCloth, getClothWithId, getSubCategory } = require("../controller/clothController");

router.post("/newcloth", newCloth);

router.get("/getallcloths", getAllCloths);

router.post("/getclothwithid", getClothWithId);

router.post("/getsubcategory", getSubCategory)

module.exports = router;