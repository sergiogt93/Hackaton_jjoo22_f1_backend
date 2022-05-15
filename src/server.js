const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const server = express();

server.use(cors());
server.use(express.json());
server.disable("x-powered-by");

server.use(function (req, res) {
  const origin = req.header("Origin");

  if (trustedOrigins.indexOf(origin) >= 0) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
});

server.use(morgan("dev"));

module.exports = server;
