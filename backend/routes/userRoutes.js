const userRouter = require("express").Router();

const { authUser, getUserProfile } = require("../controllers/user.controller");
const protect = require('../middleware/auth.middleware')

userRouter.route("/users/login").post(authUser);
userRouter.route("/users/profile").get(protect, getUserProfile);

module.exports = userRouter;