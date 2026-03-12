// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

// Register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const playerCode = uuidv4().split("-")[0]; // short unique code
        const newUser = new User({ username, email, password, playerCode });
        await newUser.save();
        res.json({ message: "User registered", playerCode });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        res.json({ message: "Login successful", user: { username: user.username, email: user.email, balance: user.balance, playerCode: user.playerCode } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
