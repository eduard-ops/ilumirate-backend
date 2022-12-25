const express = require("express");

const router = express.Router();

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

module.exports = router;
