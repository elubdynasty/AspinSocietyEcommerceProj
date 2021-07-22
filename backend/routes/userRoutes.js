const userRouter = require("express").Router();

const { authUser, getUserProfile, regUser, updateUserProfile, getUsers } = require("../controllers/user.controller");
const {protect, admin} = require('../middleware/auth.middleware')

userRouter.route("/users").post(regUser).get(protect, admin, getUsers);
userRouter.route("/users/login").post(authUser);
userRouter.route("/users/profile").get(protect, getUserProfile)
.put(protect, updateUserProfile);

module.exports = userRouter;

//TODO

//the non-admin role still has access all users info
//If I refactor the code, I get the error of a post method requiring a callback f(x)