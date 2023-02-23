const { createError } = require("../helpers");

const { checkUserById } = require("../services/auth");

const jwt = require("jsonwebtoken");

const { ACCESS_SECRET_KEY } = process.env;

const auth = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw createError(401);
    }
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);

    const user = await checkUserById(id);

    if (!user || !user.accessToken) {
      throw createError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
