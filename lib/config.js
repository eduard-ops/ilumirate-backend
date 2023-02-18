const {
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  FRONT_END_URL,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
} = process.env;

const config = {};

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
