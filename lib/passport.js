const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const FacebookStrategy = require("passport-facebook").Strategy;

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
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(() => {
        done(null, profile);
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: Config.oauth.facebookAuth.clientID,
      clientSecret: Config.oauth.facebookAuth.clientSecret,
      callbackURL: Config.oauth.facebookAuth.callbackURL,
      profileFields: ["id", "emails", "displayName", "photos"],
      scope: ["email"],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);

module.exports = passport;
