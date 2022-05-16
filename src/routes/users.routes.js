const router = require("express").Router();

const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

const { getAllUsers } = require("../controllers/user.controller");

router.route("/").all([verifyToken, isAdmin]).get(getAllUsers);

module.exports = router;
