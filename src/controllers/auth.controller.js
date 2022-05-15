const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    const validPassword = password.match("^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$");

    if (!validPassword)
      return res.status(400).json({
        message:
          "min 8 length character, and one capital letter and one number",
      });

    const hashPassword = await bcrypt.hash(password.toString(), 12);

    const userFound = await User.findOne({
      $or: [{ username: username.toString() }, { email: email.toString() }],
    });

    if (userFound) return res.status(400).json({ message: "User exist" });

    const newUser = await User.create({
      username: username.toString(),
      email: email.toString(),
      password: hashPassword,
    });

    if (!newUser) {
      res.status(400).json({ error: newUser });
    }

    const token = jwt.sign({ id: newUser._id }, config.token_secret, {
      expiresIn: 86400,
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(404).json({ error });
  }
}

async function signin(req, res) {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email: email.toString() });

    const passwordCorrect =
      userFound === null
        ? false
        : await bcrypt.compare(password.toString(), userFound.password);

    if (!(userFound && passwordCorrect)) {
      res.status(401).json({ error: "invalid user or password" });
    }

    const token = jwt.sign({ id: userFound._id }, config.token_secret, {
      expiresIn: 86400,
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  signup,
  signin,
};
