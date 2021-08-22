const asyncHandler = require("express-async-handler");
let Product = require("../models/product.model");

const getProducts = asyncHandler(async (req, res) => {

     const products = await Product.find({});

     res.json(products);
})


const getProductbyId = asyncHandler(async (req, res) => {
  
   const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Sorry, product can't be found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {

    await product.remove()

    res.json({
      message: `Product #${req.params.id} removed`,
    });

  } else {
    res.status(404);
    throw new Error("Sorry, product can't be found");
  }
});

module.exports = {
    getProducts, getProductbyId, deleteProduct
}