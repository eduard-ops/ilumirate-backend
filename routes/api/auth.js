const express = require("express");

const router = express.Router();

const passport = require("../../lib/passport");

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

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/error",
    successRedirect: "/seccess",
  })
);

router.get("/seccess", function (req, res, next) {
  res.json({ message: "done" });
});

router.get("/error", function (req, res, next) {
  res.json({ message: "👿" });
});

module.exports = router;
