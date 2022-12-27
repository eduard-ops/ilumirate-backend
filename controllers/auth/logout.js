const { setTokenUser } = require("../../services/auth");

const logout = async (req, res) => {
  req.session = null;
  const { id } = req.user;
  await setTokenUser(id);
  res.status(204).json();
};

module.exports = logout;
