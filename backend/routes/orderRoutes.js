const orderRouter = require("express").Router();

const {addOrderItems, getOrderById, updateOrderToPaid} = require("../controllers/order.controller");
const protect = require("../middleware/auth.middleware");


orderRouter.route("/orders").post(protect, addOrderItems);
orderRouter.route("/orders/:id").get(protect, getOrderById);
orderRouter.route("/orders/:id/pay").put(protect, updateOrderToPaid);

module.exports = orderRouter;
