const express = require("express");

const router = express.Router();

const { ctrlWrapper } = require("../../middlewares");

const { auth } = require("../../controllers");

router.post("/signup", ctrlWrapper(auth.signup));

router.post("/login", ctrlWrapper(auth.login));

router.get("/logout", ctrlWrapper(auth.logout));

module.exports = router;
