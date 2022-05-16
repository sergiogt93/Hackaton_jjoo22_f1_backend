//Import libraries
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Import configuration and functions helpers
const config = require("../config/config");
const {
  signupValidation,
  signinValidation,
} = require("../validationsRequest/AuthValidation");

//Import models
const User = require("../models/User");

//Register a new user
async function signup(req, res) {
  try {
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

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

//Login with a user
async function signin(req, res) {
  try {
    const { error } = signinValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
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
