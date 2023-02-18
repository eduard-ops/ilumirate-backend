const { checkUser, setTokenUser } = require("../../services/auth");

const { createError, generateTokens } = require("../../helpers");

const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await checkUser(email);
  const passCompare = bcrypt.compareSync(password, user.password);

  if (!user || !passCompare) {
    throw createError(401, `Email or password is wrong`);
  }

  const { accessToken, refreshToken } = generateTokens(user.id);
  await setTokenUser(user.id, accessToken, refreshToken);
  res.json({
    status: "success",
    code: 200,
    data: { accessToken, refreshToken },
  });
};

module.exports = login;
