const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const Session = sequelize.define("Session", {
  sid: { type: DataTypes.STRING, primaryKey: true },
  expires: { type: DataTypes.DATE },
  data: { type: DataTypes.STRING(50000) },
});

module.exports = Session;
