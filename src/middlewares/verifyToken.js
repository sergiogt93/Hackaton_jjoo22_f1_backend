const jwt = require("jsonwebtoken");
const User = require("../models/User");

// middleware to validate token (protected routes)
module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    let token = null;

    //Comprove if a exist header authoritzation
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.substr(7);
    }

    if (!token) return res.status(401).json({ error: "token missing" });

    //Decoded provider token by user
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!token || !decoded.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    //With a token provider use a found user
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ msg: "No user found" });

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
