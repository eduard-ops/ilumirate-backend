const session = require("express-session");

const Sequelize = require("sequelize");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "./session.sqlite",
});

const myStore = new SequelizeStore({
  db: sequelize,
});

module.exports = myStore;
