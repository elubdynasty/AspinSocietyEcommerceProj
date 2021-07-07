const orderRouter = require("express").Router();

const { addOrderItems } = require("../controllers/order.controller");
const protect = require("../middleware/auth.middleware");

orderRouter.route("/orders").post(protect, addOrderItems);

module.exports = orderRouter;
