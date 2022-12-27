const {
  checkUser,
  signupUser,
  setTokenUser,
  checkUserById,
} = require("../../services/auth");

const { generateToken } = require("../../helpers");

const authSuccess = async (req, res, next) => {
  if (req.session?.passport?.user) {
    const userObj = {};

    userObj.email = req.session.passport.user.emails[0].value;
    userObj.name = req.session.passport.user.displayName;
    userObj.avatar = req.session.passport.user?.photos[0]?.value;

    const { email } = userObj;
    const user = await checkUser(email);

    if (!user) {
      const addUser = await signupUser(email);
      const token = generateToken(addUser.dataValues.id);
      await setTokenUser(addUser.dataValues.id, token);
      res.json({ message: "Wellcom", data: { ...userObj, token } });
      return;
    }

    const data = await checkUserById(user.dataValues.id);

    if (!data.token) {
      const newToken = generateToken(data.id);
      await setTokenUser(data.id, newToken);
      res.json({
        message: "Already authenticated , New Token",
        data: { ...userObj, token: newToken },
      });
      return;
    }
    res.json({
      message: "Your token",
      data: { ...userObj, token: data.token },
    });
  }
};

module.exports = authSuccess;

// user.dataValues?.token
//   ? token
//   : (token = generateToken(user.dataValues.id));
