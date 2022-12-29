const session = require("express-session");

const sequelize = require("../db");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sessionStore = new SequelizeStore({
  db: sequelize,
  table: "Session",
});

module.exports = sessionStore;
