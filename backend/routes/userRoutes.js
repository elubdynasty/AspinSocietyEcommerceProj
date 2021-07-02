const userRouter = require("express").Router();
const authUser = require("../controllers/user.controller");

userRouter.route("/users/login").post(authUser);

module.exports = userRouter;
