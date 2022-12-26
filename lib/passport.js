const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const Config = require("./config");

passport.use(
  new GoogleStrategy(
    {
      clientID: Config.oauth.googleAuth.clientID,
      clientSecret: Config.oauth.googleAuth.clientSecret,
      callbackURL: Config.oauth.googleAuth.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports = passport;
