// routes/wallet.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Transaction = require("../models/Transaction");

// Add balance (deposit)
router.post("/deposit", async (req, res) => {
    try {
        const { playerCode, amount } = req.body;
        const user = await User.findOne({ playerCode });
        if (!user) return res.status(400).json({ message: "User not found" });

        user.balance += amount;
        await user.save();

        const txn = new Transaction({ user: user._id, type: "deposit", amount });
        await txn.save();

        res.json({ message: "Balance added", balance: user.balance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Deduct balance
router.post("/deduct", async (req, res) => {
    try {
        const { playerCode, amount } = req.body;
        const user = await User.findOne({ playerCode });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

        user.balance -= amount;
        await user.save();

        const txn = new Transaction({ user: user._id, type: "withdraw", amount });
        await txn.save();

        res.json({ message: "Balance deducted", balance: user.balance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
