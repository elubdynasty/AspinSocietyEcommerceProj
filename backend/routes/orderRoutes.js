const orderRouter = require("express").Router();

const {addOrderItems, getOrderById} = require("../controllers/order.controller");
const protect = require("../middleware/auth.middleware");


orderRouter.route("/orders").post(protect, addOrderItems);
orderRouter.route("/orders/:id").get(protect, getOrderById);

module.exports = orderRouter;
