const express = require("express");

const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");

const JWT_SECRET = process.env.JWT_SECRET;

router.use(express.json());

const signupBody = zod.object({
  username: zod.string().email(),
  fullName: zod.string(),
  password: zod.string(),
  confirmPassword: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  const { data, error } = signupBody.safeParse(req.body);

  if (error) {
    return res.status(411).json({
      message: "Invalid input",
      errors: error.errors, // Optionally, you can include the detailed validation errors
    });
  }

  if (!success) {
    return res.status(411).json({
      message: "invalid input",
    });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }
  const user = await User.create({
    username: req.body.username,
    fullName: req.body.fullName,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );
  res.json({
    message: "User created successfully",
    token: token,
  });
});
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/login", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const firstName = user.firstName;
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
      firstName: firstName,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});
module.exports = router;
