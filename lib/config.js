const { GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } = process.env;

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

config.oauth = {
  // 'facebookAuth' : {
  //     'clientID': 'your_client_id',
  //     'clientSecret': 'your_client_secret',
  //     'callbackURL': '/registration/facebook/callback'
  // },
  googleAuth: {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback",
  },
};

module.exports = config;
