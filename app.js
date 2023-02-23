/* eslint-disable node/no-path-concat */
require("dotenv").config();

require("./models");

const { parceCookie } = require("./helpers");

const express = require("express");

const logger = require("morgan");

const cors = require("cors");

const app = express();

const router = require("./routes/api");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

app.use("/api", router);

app.use(express.static(__dirname + "/public"));

app.use("/home", (req, res) => {
  const data = req.headers.cookie;
  const { email } = parceCookie(data);
  res.render("home", { tagline: email });
});

app.use("/", (req, res) => {
  res.render("login");
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
