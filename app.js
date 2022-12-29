require("dotenv").config();

const express = require("express");

const session = require("express-session");

const logger = require("morgan");

const cors = require("cors");

const router = require("./routes/api");

require("./models");

// const Config = require("./lib/config");

const app = express();

const passport = require("./lib/passport");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require("./db");

app.use(
  session({
    secret: "fdsfsd3423423",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    },
    store: new SequelizeStore({
      db: sequelize,
      table: "Session",
    }),
  })
);

app.get("/home", (req, res) => res.send("HOME"));

app.use(passport.initialize());
app.use(passport.session());

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api", router);

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
