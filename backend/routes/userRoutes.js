const userRouter = require("express").Router();

const { authUser, getUserProfile, regUser } = require("../controllers/user.controller");
const protect = require('../middleware/auth.middleware')

userRouter.route("/users").post(regUser);
userRouter.route("/users/login").post(authUser);
userRouter.route("/users/profile").get(protect, getUserProfile);

module.exports = userRouter;