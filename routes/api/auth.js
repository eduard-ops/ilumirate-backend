const express = require("express");

const router = express.Router();

const passport = require("../../lib/passport");

const Config = require("../../lib/config");

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

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: Config.redirect.error,
    successRedirect: Config.redirect.seccess,
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: Config.redirect.seccess,
    failureRedirect: Config.redirect.error,
  })
);

router.get("/seccess", ctrlWrapper(auth.authSuccess));

router.get("/error", (req, res, next) => res.json({ message: "👿" }));

module.exports = router;
