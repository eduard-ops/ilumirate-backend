require("dotenv").config();

const express = require("express");

const session = require("express-session");

const logger = require("morgan");

const cors = require("cors");

const router = require("./routes/api");

const path = require("path");

const Config = require("./lib/config");

const app = express();

const passport = require("./lib/passport");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/api", router);

app.use(session(Config.session));

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5000/c",
    failureMessage: "dfsdfsdfsdf",
  }),
  (req, res) => {
    res.redirect("/c");
  }
);

app.get("/c", function (req, res, next) {
  res.json({ message: "done" });
});

// app.use(
//   session({
//     secret: Config.session.secret,
//     store: myStore,
//     saveUninitialized: false,
//     resave: Config.session.resave,
//     proxy: Config.session.proxy,
//   })
// );

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
