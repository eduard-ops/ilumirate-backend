const { checkUser, signupUser, setTokenUser } = require("../../services/auth");

const { generateToken } = require("../../helpers");

const authSuccess = async (req, res) => {
  if (req.session?.passport?.user) {
    const userObj = {};

    userObj.email = req.session.passport.user.emails[0].value;

    const { email } = userObj;
    const user = await checkUser(email);

    console.log(user);

    if (!user) {
      const addUser = await signupUser(email);

      const token = generateToken(addUser.dataValues.id);
      await setTokenUser(addUser.dataValues.id, token);

      res.json({ message: "Welcom", token });
    }
  }
};

module.exports = authSuccess;
