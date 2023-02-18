const { setTokenUser } = require("../../services/auth");

const { generateTokens } = require("../../helpers");

const userAuthentication = async (req, res, next) => {
  const id = req.user.dataValues.id;
  const { accessToken, refreshToken } = generateTokens(id);
  await setTokenUser(id, accessToken, refreshToken);

  res.json({
    status: "success",
    code: 200,
    data: { accessToken, refreshToken },
  });
};

module.exports = userAuthentication;
