const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

/* =========================
REGISTER
========================= */

router.post("/register", async (req, res) => {

  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const playerCode = "P" + Math.floor(100000 + Math.random() * 900000);

    const newUser = new User({

      username,
      email,
      password: hashedPassword,
      playerCode,
      balance: 0

    });

    await newUser.save();

    res.json({
      message: "Registration successful",
      playerCode
    });

  } catch (err) {

    res.status(500).json({
      message: "Server error",
      error: err.message
    });

  }

});


/* =========================
LOGIN
========================= */

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    res.json({

      message: "Login successful",
      token,
      playerCode: user.playerCode,
      balance: user.balance

    });

  } catch (err) {

    res.status(500).json({
      message: "Server error",
      error: err.message
    });

  }

});

module.exports = router;
