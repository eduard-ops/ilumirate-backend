const { checkUser, setTokenUser } = require("../../services/auth");

const { createError, generateToken } = require("../../helpers");

const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await checkUser(email);
  const passCompare = bcrypt.compareSync(password, user.password || "");

  if (!user || !passCompare) {
    throw createError(401, `Email or password is wrong`);
  }

  const token = generateToken(user.id);
  await setTokenUser(user.id, token);
  res.json({ status: "success", code: 200, data: { token } });
};

module.exports = login;
