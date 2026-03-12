const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/add-balance", async (req, res) => {

  const { playerId, amount } = req.body;

  const user = await User.findOne({ playerId });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.balance += amount;

  await user.save();

  res.json({
    message: "Balance added",
    balance: user.balance
  });

});

module.exports = router;
