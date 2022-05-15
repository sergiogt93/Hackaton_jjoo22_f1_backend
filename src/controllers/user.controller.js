// Import models
const User = require("../models/User");

// Return all users
async function getAllUsers(_req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  getAllUsers,
};
