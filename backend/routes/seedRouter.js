const { Router } = require("express")
const { data } = require("../data")
const Product = require("../models/product.model")

const seedRouter = Router()

seedRouter.get('/', async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send({
        createdProducts
    })
})


module.exports = seedRouter