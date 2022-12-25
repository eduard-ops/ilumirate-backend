const { signupUser, checkUser } = require("../../services/auth");

const { createError } = require("../../helpers");

const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const candidate = await checkUser(email);
  if (candidate) {
    throw createError(409, `User with ${email} already exist`);
  }

  const hashPassword = await bcrypt.hash(password, 5);
  const result = await signupUser(email, hashPassword);
  res.status(201).json({
    message: "Created",
    status: 201,
    data: {
      user: {
        email: result.email,
      },
    },
  });
};
module.exports = signup;
