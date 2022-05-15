const router = require("express").Router();

const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");

const { getUsers } = require("../controllers/user.controller");

router.route("/").all(verifyToken, isAdmin).get(getUsers);

module.exports = router;
