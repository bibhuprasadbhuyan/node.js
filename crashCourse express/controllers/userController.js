const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvilable = await User.findOne({ email });
  if (userAvilable) {
    res.status(400);
    throw new Error("User Already registered");
  }

  //hash Pasword
  const hashPasword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashPasword,
  });

  if (user) {
    res.status(201).json({ _id: user.id, mail: user.email });
  } else {
    res.status(400);
    throw new Error("usesr data is not valid");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accesstoken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    res.status(200).json({ accesstoken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

console.log('this is a test');

module.exports = { registerUser, loginUser, currentUser };
