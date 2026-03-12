// routes/game.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Transaction = require("../models/Transaction");

// Submit game result
router.post("/result", async (req, res) => {
    try {
        const { playerCode, game, betAmount, result } = req.body; // result = "win" or "lose"
        const user = await User.findOne({ playerCode });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.balance < betAmount) return res.status(400).json({ message: "Insufficient balance" });

        // Deduct bet first
        user.balance -= betAmount;

        let txnType = "bet";

        if (result === "win") {
            const reward = betAmount * 2; // example: win = 2x bet
            user.balance += reward;
            txnType = "win";
        }

        await user.save();

        // Log transaction
        const txn = new Transaction({ user: user._id, type: txnType, amount: betAmount, game });
        await txn.save();

        res.json({ message: "Game result processed", balance: user.balance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
