const { SECRET_KEY } = process.env;

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const payload = {
    id: id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  return token;
};

module.exports = generateToken;
