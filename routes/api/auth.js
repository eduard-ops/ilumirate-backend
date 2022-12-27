const express = require("express");

const router = express.Router();

const passport = require("../../lib/passport");

const Config = require("../../lib/config");

const { createError } = require("../../helpers");

const {
  ctrlWrapper,
  validation,
  authMiddleware,
} = require("../../middlewares");

const { joiUserSchema } = require("../../models/user");

const { auth } = require("../../controllers");

router.post("/signup", validation(joiUserSchema), ctrlWrapper(auth.signup));

router.post("/login", validation(joiUserSchema), ctrlWrapper(auth.login));

router.get("/logout", authMiddleware, ctrlWrapper(auth.logout));

router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: Config.redirect.error,
    successRedirect: Config.redirect.seccess,
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.json({ message: "Not Authorize" });
  }
};

router.get("/seccess", isLoggedIn, ctrlWrapper(auth.authSuccess));

router.get("/error", function (req, res, next) {
  res.json({ message: "👿" });
});

module.exports = router;
