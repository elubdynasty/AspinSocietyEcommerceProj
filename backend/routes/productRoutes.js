const productRouter = require('express').Router()
const {
  getProducts,
  getProductbyId,
  deleteProduct
} = require("../controllers/product.controller");

const { protect, admin } = require("../middleware/auth.middleware");


productRouter.route("/products").get(getProducts);

productRouter.route("/products/:id").get(getProductbyId).delete(protect, admin, deleteProduct);

module.exports = productRouter;