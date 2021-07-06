const userRouter = require("express").Router();

const { authUser, getUserProfile, regUser, updateUserProfile } = require("../controllers/user.controller");
const protect = require('../middleware/auth.middleware')

userRouter.route("/users").post(regUser);
userRouter.route("/users/login").post(authUser);
userRouter.route("/users/profile").get(protect, getUserProfile)
.put(protect, updateUserProfile);

module.exports = userRouter;