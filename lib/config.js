const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID, FRONT_END_URL } = process.env;

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
  error: `${FRONT_END_URL}/api/auth/seccess`,
};

config.oauth = {
  // 'facebookAuth' : {
  //     'clientID': 'your_client_id',
  //     'clientSecret': 'your_client_secret',
  //     'callbackURL': '/registration/facebook/callback'
  // },
  googleAuth: {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${FRONT_END_URL}/api/auth/google/callback`,
  },
};

module.exports = config;
