const {
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  FRONT_END_URL,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
} = process.env;

const config = {};

// config.session = {
//   secret: "keyboard cat",
//   resave: false,
//   proxy: true,
// };
config.session = {
  resave: false,
  saveUninitialized: true,
  secret: "SECRET",
};

config.redirect = {
  seccess: `${FRONT_END_URL}/api/auth/seccess`,
  error: `${FRONT_END_URL}/api/auth/error`,
};

config.oauth = {
  facebookAuth: {
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: `${FRONT_END_URL}/api/auth/facebook/callback`,
  },
  googleAuth: {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${FRONT_END_URL}/api/auth/google/callback`,
  },
};

module.exports = config;
