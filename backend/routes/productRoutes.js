const productRouter = require('express').Router()
const {
  getProducts,
  getProductbyId,
  createProduct,
  deleteProduct,
  updateProduct
} = require("../controllers/product.controller");

const { protect, admin } = require("../middleware/auth.middleware");


productRouter
  .route("/products")
  .get(getProducts)
  .post(protect, admin, createProduct);

productRouter
  .route("/products/:id")
  .get(getProductbyId)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

module.exports = productRouter;