const { checkUser, signupUser, setTokenUser } = require("../../services/auth");

const { generateToken } = require("../../helpers");

const authSuccess = async (req, res) => {
  if (req.session?.passport?.user) {
    const userObj = {};

    userObj.email = req.session.passport.user.emails[0].value;
    userObj.name = req.session.passport.user.displayName;
    userObj.avatar = req.session.passport.user?.photos[0]?.value;

    const { email } = userObj;
    const user = await checkUser(email);

    if (user) {
      const token = generateToken(user.dataValues.id);
      await setTokenUser(user.dataValues.id, token);
      res.json({
        message: "User already authenticate",
        data: { ...userObj, token },
      });
      return;
    }

    const addUser = await signupUser(email);
    const token = generateToken(addUser.dataValues.id);
    await setTokenUser(addUser.dataValues.id, token);

    res.json({ message: "Wellcom", data: { ...userObj, token } });
  }
};

module.exports = authSuccess;
