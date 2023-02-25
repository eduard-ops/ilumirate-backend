const { setTokenUser } = require("../../services/auth");

const { generateTokens } = require("../../helpers");

const { FRONT_END_URL } = process.env;

const userAuthentication = async (req, res, next) => {
  const id = req.user.dataValues.id;
  const { accessToken, refreshToken } = generateTokens(id);
  await setTokenUser(id, accessToken, refreshToken);

  res
    .cookie("email", req.user.dataValues.email)
    .cookie("tokens", { accessToken, refreshToken })
    .redirect(`${FRONT_END_URL}/`);
};

module.exports = userAuthentication;
