const { Router } = require("express");
const Product = require("../models/product.model")

const productRouter = Router()

productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products)
})

productRouter.get("/slug/:slug", async (req, res) => {
    const slug = req.params.slug;
    const product = await Product.findOne({slug})
    if (product)  {
        return res.status(200).send(product)

    }
    res.status(404).send("Not found")
})

productRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id)
    if (product)  {
        return res.status(200).send(product)
    }
    res.status(404).send("Not found")
})

module.exports = productRouter