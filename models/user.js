const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const Joi = require("joi");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  token: { type: DataTypes.STRING, defaultValue: null },
});

const joiUserSchema = Joi.object({
  email: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

module.exports = {
  User,
  joiUserSchema,
};