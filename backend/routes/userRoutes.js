const userRouter = require("express").Router();

const { 
    authUser, 
    getUserProfile, 
    regUser, 
    updateUserProfile, 
    getUsers, 
    deleteUser, 
    getUserById, 
    updateUser 
} = require("../controllers/user.controller");

const {protect, admin} = require('../middleware/auth.middleware')

userRouter.route("/users").post(regUser).get(protect, admin, getUsers);
userRouter.route("/users/login").post(authUser);
userRouter.route("/users/profile").get(protect, getUserProfile)
.put(protect, updateUserProfile);

userRouter.route("/users/:id").delete(protect, admin, deleteUser)
.get(protect, admin, getUserById)
.put(protect, admin, updateUser)

module.exports = userRouter;