const { User } = require("../../models/user");

const { tryCatchWrapper } = require("../../helpers");

const checkUser = async (email) => {
  const candidate = await tryCatchWrapper(User.findOne({ where: { email } }));

  return candidate;
};

module.exports = checkUser;
