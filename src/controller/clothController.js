const NewClothModel = require("../models/newClothModel");
const asyncHandler = require("express-async-handler");

const getAllCloths = asyncHandler(async (req, res) => {
    try {
        let allCloths = await NewClothModel.find();
        res.send({ allCloths }).status(201);
    } catch (error) {
        res.send({ message: "server error", error }).status(401);
    }
});

const newCloth = asyncHandler(async (req, res) => {
    // const user = req.user;
    try {
        const product = new NewClothModel(req.body);
        const createProduct = await product.save();
        console.log(createProduct);
        res.send({ product: createProduct }).status(201);
    } catch (error) {
        res.send({ message: "server error", error }).status(401);
    }
});

const getClothWithId = asyncHandler(async (req, res) => {
    try {
        // console.log(req.body);
        const product = await NewClothModel.findOne({ id: req.body.id })
        if (product) {
            // console.log(product);
            res.send({ product: product }).status(201);
        }
        else {
            res.send({ message: "cannot find the details" }).status(201)
        }
    } catch (error) {
        res.send({ message: "server error", error }).status(401);
    }
});

const getSubCategory = asyncHandler(async (req, res) => {
    try {
        const items = await NewClothModel.find({ category: req.body.category });

        const subCategory = [...new Set(items.map((elm) => {
            return (elm.subCategory);
        }))];
        res.send({ subCategory: subCategory, category: req.body.category }).status(200);

    } catch (error) {
        res.send({ message: "server error", error }).status(401);
    }
});

module.exports = {
    getAllCloths,
    newCloth,
    getClothWithId,
    getSubCategory
}