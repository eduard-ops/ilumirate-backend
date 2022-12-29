require("dotenv").config();

require("./models");

const express = require("express");

const session = require("express-session");

const logger = require("morgan");

const cors = require("cors");

const app = express();

const router = require("./routes/api");

const passport = require("./lib/passport");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const sessionStore = require("./lib/sessionStore");

const Config = require("./lib/config");

app.use(
  session({
    ...Config.session,
    store: sessionStore,
  })
);

app.get("/home", (req, res) => res.send("HOME"));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
