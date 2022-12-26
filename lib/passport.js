const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const Config = require("./config");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: Config.oauth.googleAuth.clientID,
      clientSecret: Config.oauth.googleAuth.clientSecret,
      callbackURL: Config.oauth.googleAuth.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

module.exports = passport;
