const User = require("../models/User");

async function getUsers(_req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  getUsers,
};
