const productRouter = require('express').Router()
const {
  getProducts,
  getProductbyId,
} = require("../controllers/product.controller");


productRouter.route("/products").get(getProducts);

productRouter.route("/products/:id").get(getProductbyId);

module.exports = productRouter;