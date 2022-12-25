const { User } = require("../../models/user");

const { tryCatchWrapper } = require("../../helpers");

const setTokenUser = async (userId, userToken = null) => {
  await tryCatchWrapper(
    User.update({ token: userToken }, { where: { id: userId } })
  );
};

module.exports = setTokenUser;
