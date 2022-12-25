const { checkUser, setTokenUser } = require("../../services/auth");

const { createError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await checkUser(email);
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare) {
    throw createError(401, `Email or password is wrong`);
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await setTokenUser(user.id, token);
  res.json({ status: "success", code: 200, data: { token } });
};

module.exports = login;
