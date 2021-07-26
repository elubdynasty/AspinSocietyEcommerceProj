const userRouter = require("express").Router();

const { authUser, getUserProfile, regUser, updateUserProfile, getUsers } = require("../controllers/user.controller");
const {protect, admin} = require('../middleware/auth.middleware')

userRouter.route("/users").post(regUser).get(protect, admin, getUsers);
userRouter.route("/users/login").post(authUser);
userRouter.route("/users/profile").get(protect, getUserProfile)
.put(protect, updateUserProfile);

module.exports = userRouter;