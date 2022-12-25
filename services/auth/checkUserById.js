const { User } = require("../../models/user");
const { tryCatchWrapper } = require("../../helpers");

const checkUserById = async (userId) => {
  const user = await tryCatchWrapper(User.findOne({ where: { id: userId } }));
  return user;
};

module.exports = checkUserById;
