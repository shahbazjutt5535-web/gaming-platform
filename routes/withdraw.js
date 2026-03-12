// routes/withdraw.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Transaction = require("../models/Transaction");

// Withdraw request
router.post("/", async (req, res) => {
    try {
        const { playerCode, amount } = req.body;
        const user = await User.findOne({ playerCode });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.balance < amount) return res.status(400).json({ message: "Insufficient balance" });

        user.balance -= amount;
        await user.save();

        const txn = new Transaction({ user: user._id, type: "withdraw", amount });
        await txn.save();

        // For now: withdrawal is manual. Later can automate via crypto API.
        res.json({ message: "Withdrawal requested", balance: user.balance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
