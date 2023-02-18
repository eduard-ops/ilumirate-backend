const { User } = require("../../models/user");

const { tryCatchWrapper } = require("../../helpers");

const checkUserByToken = async (refreshToken) => {
  const candidate = await tryCatchWrapper(
    User.findOne({ where: { refreshToken } })
  );

  return candidate;
};

module.exports = checkUserByToken;
