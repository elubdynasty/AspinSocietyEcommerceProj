const productRouter = require('express').Router()
const asyncHandler = require('express-async-handler')
let Product = require('../models/product.model')


productRouter.get("/", asyncHandler(async (req, res) => {

  const products = await Product.find({}) 

  res.json(products);
}));

productRouter.get("/:id", asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if(product){
      res.json(product);
  } else {
      res.status(404)
      throw new Error("Sorry, product can't be found")
  }
}));

module.exports = productRouter;