const { REFRESH_SECRET_KEY } = process.env;

const { checkUserByToken } = require("../../services/auth");

const { createError, generateTokens } = require("../../helpers");

const jwt = require("jsonwebtoken");

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);

    const isExist = await checkUserByToken(token);
    if (!isExist) {
      throw createError(403, "Token invalid");
    }
    const { accessToken, refreshToken } = generateTokens(id);
    res.json({
      status: "success",
      code: 200,
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    throw createError(403, error.message);
  }
};

module.exports = refresh;
