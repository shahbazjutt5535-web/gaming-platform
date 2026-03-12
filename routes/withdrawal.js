const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Withdraw balance
router.post("/", async (req, res) => {
  const { playerCode, amount, walletAddress } = req.body;
  try {
    const user = await User.findOne({ playerCode });
    if (!user) return res.json({ message: "User not found" });
    if (amount > user.balance) return res.json({ message: "Insufficient balance" });

    // Here: send crypto to walletAddress via API
    user.balance -= parseFloat(amount);
    await user.save();
    res.json({ message: `Withdraw $${amount} to ${walletAddress}`, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

module.exports = router;
