const { User } = require("../../models/user");

const { tryCatchWrapper } = require("../../helpers");

const setTokenUser = async (
  userId,
  accessToken = null,
  refreshToken = null
) => {
  await tryCatchWrapper(
    User.update({ accessToken, refreshToken }, { where: { id: userId } })
  );
};

module.exports = setTokenUser;
