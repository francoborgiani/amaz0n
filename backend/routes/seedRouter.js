const { Router } = require("express");
const { data } = require("../data");
const Product = require("../models/product.model");
const User = require("../models/user.model");

const seedRouter = Router()

seedRouter.get('/', async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({
        createdProducts,
        createdUsers
    })
})


module.exports = seedRouter