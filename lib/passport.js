const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const FacebookStrategy = require("passport-facebook").Strategy;

const passportStrategy = require("./passportStrategy");

const Config = require("./config");

passport.use(
  new GoogleStrategy(
    {
      clientID: Config.oauth.googleAuth.clientID,
      clientSecret: Config.oauth.googleAuth.clientSecret,
      callbackURL: Config.oauth.googleAuth.callbackURL,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) =>
      await passportStrategy(accessToken, refreshToken, profile, done)
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
    async (accessToken, refreshToken, profile, done) =>
      await passportStrategy(accessToken, refreshToken, profile, done)
  )
);

module.exports = passport;
