/* eslint-disable no-useless-escape */
const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const Joi = require("joi");

const emailRegexp = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      is: emailRegexp,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    len: [6, ""],
  },

  accessToken: { type: DataTypes.STRING, defaultValue: null },
  refreshToken: { type: DataTypes.STRING, defaultValue: null },
});

const joiUserSchema = Joi.object({
  email: Joi.string().trim().pattern(emailRegexp).required(),
  password: Joi.string().trim().min(6).required(),
});

const joiRefreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  User,
  joiUserSchema,
  joiRefreshSchema,
};
