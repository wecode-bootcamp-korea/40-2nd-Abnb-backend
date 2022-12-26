const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { response } = require("express");

const createApp = () => {
  const app = express();

  app.get("/ping", async (req, res) => {
    res.status(200).json({ message: "pong!" });
  });

  app.use(express.json());
  app.use(cors());
  app.use(morgan("combined"));

  return app;
};

module.exports = { createApp };
