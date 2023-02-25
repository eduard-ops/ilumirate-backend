const { User } = require("../../models/user");

const { tryCatchWrapper } = require("../../helpers");

const signup = async (email, hashPassword = null) => {
  const user = await tryCatchWrapper(
    User.create({ email, password: hashPassword })
  );

  return user;
};

module.exports = signup;
