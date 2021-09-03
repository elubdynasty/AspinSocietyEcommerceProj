const orderRouter = require("express").Router();

const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders
} = require("../controllers/order.controller");
const { protect, admin } = require('../middleware/auth.middleware')


orderRouter
  .route("/orders")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);
orderRouter.route("/orders/myorders").get(protect, getMyOrders);
orderRouter.route("/orders/:id").get(protect, getOrderById);
orderRouter.route("/orders/:id/pay").put(protect, updateOrderToPaid);


module.exports = orderRouter;
