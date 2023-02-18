const { checkUser, signupUser } = require("../services/auth");

const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcryptjs");

const passportStrategy = async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const user = await checkUser(email);
    if (user) {
      return done(null, user);
    }
    const password = await bcrypt.hash(uuidv4(), 8);
    const newUser = await signupUser(email, password);
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

module.exports = passportStrategy;
