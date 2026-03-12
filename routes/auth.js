const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { generateToken } = require("../utils/jwt");

/* ===============================
REGISTER USER
=============================== */

router.post("/register", async (req, res) => {

  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {

      return res.json({
        message: "All fields required"
      });

    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.json({
        message: "User already exists"
      });

    }

    const playerCode = "P" + Math.floor(100000 + Math.random() * 900000);

    const newUser = new User({

      username,
      email,
      password,
      playerCode,
      balance: 0

    });

    await newUser.save();

    res.json({

      message: "Registration successful",
      playerCode: playerCode

    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});


/* ===============================
LOGIN USER
=============================== */

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.json({
        message: "User not found"
      });

    }

    if (user.password !== password) {

      return res.json({
        message: "Incorrect password"
      });

    }

    const token = generateToken(user);

    res.json({

      message: "Login successful",
      token: token,
      playerCode: user.playerCode,
      balance: user.balance

    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});

module.exports = router;
