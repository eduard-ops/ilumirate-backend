const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const FacebookStrategy = require("passport-facebook").Strategy;

const passportStrategy = require("./passportStrategy");

// const { checkUserById } = require("../services/auth");

const Config = require("./config");

// passport.serializeUser((profile, done) => done(null, profile));

// passport.deserializeUser(async (profile, done) => {
//   try {
//     const user = await checkUserById(profile.id);

//     done(null, user);
//   } catch (error) {
//     done(error, false);
//   }
// });

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
