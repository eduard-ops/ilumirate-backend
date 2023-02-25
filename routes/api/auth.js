const express = require("express");

const router = express.Router();

const passport = require("../../lib/passport/passport");

const {
  ctrlWrapper,
  validation,
  authMiddleware,
} = require("../../middlewares");

const { joiUserSchema, joiRefreshSchema } = require("../../models/user");

const { auth } = require("../../controllers");

router.post("/signup", validation(joiUserSchema), ctrlWrapper(auth.signup));

router.post("/login", validation(joiUserSchema), ctrlWrapper(auth.login));

router.post(
  "/refresh",
  validation(joiRefreshSchema),
  ctrlWrapper(auth.refresh)
);

router.get("/google", passport.authenticate("google"));

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  ctrlWrapper(auth.userAuthentication)
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  ctrlWrapper(auth.userAuthentication)
);

router.get("/logout", authMiddleware, ctrlWrapper(auth.logout));

module.exports = router;
