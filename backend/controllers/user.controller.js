const asyncHandler = require("express-async-handler");

let User = require("../models/user.model");
const genToken = require("../utils/genToken")

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id)
    });
  } else {
      res.status(401).json({message: 'Invalid email or password'})
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user){

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })

  } else {
    res.status(404).json({message: 'User not found'})
  }
});

module.exports = {
  authUser, getUserProfile
}
