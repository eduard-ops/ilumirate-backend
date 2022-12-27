const { setTokenUser } = require("../../services/auth");

const logout = async (req, res, next) => {
  const { id } = req.user;
  await setTokenUser(id);
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/home");
    // res.status(204).json();
  });
};

module.exports = logout;
