const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(userData) {
  const { username, email, password } = userData;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  });

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id)
  };
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    };
  } else {
    throw new Error('Invalid email or password');
  }
}

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
}

module.exports = { registerUser, loginUser };
