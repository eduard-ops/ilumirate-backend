const { SECRET_KEY } = process.env;

// const { setTokenUser } = require("../services/auth");

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const payload = {
    id: id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  //   await setTokenUser(id, token);
  return token;
};

module.exports = generateToken;
