const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { checkDeposit } = require("../utils/crypto");

/*
Manual Deposit Check
*/

router.post("/check-deposit", async (req, res) => {

  const { playerCode, walletAddress } = req.body;

  try {

    const user = await User.findOne({ playerCode });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const deposit = await checkDeposit(walletAddress);

    if (!deposit) {
      return res.json({ message: "No new deposit found" });
    }

    user.balance += deposit.amount;

    await user.save();

    res.json({
      message: "Deposit detected",
      amount: deposit.amount,
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
