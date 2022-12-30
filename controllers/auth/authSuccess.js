const { checkUser, signupUser, setTokenUser } = require("../../services/auth");

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
      const {
        dataValues: { id },
      } = await signupUser(email);
      const token = generateToken(id);
      await setTokenUser(id, token);
      res.json({ message: "Wellcom", data: { ...userObj, token } });
      return;
    }

    const { id, token } = user.dataValues;
    if (!token) {
      const newToken = generateToken(id);
      await setTokenUser(id, newToken);
      res.json({
        message: "Already authenticated , New Token",
        data: { ...userObj, token: newToken },
      });
      return;
    }
    res.json({
      message: "Your token",
      data: { ...userObj, token },
    });
  }
};

module.exports = authSuccess;
