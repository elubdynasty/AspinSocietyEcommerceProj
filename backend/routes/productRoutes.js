const productRouter = require('express').Router()
const {
  getProducts,
  getProductbyId,
} = require("../controllers/product.controller");


productRouter.route("/").get(getProducts);

productRouter.route("/:id").get(getProductbyId);

module.exports = productRouter;