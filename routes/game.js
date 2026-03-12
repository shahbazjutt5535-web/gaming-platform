const express = require("express");
const router = express.Router();

const User = require("../models/User");
const GameLog = require("../models/GameLog");

function generateResult() {

  const random = Math.random();

  if (random < 0.48) {
    return "win";
  }

  return "lose";
}

router.post("/play", async (req, res) => {

  try {

    const { playerCode, betAmount, game } = req.body;

    const user = await User.findOne({ playerCode });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    if (user.balance < betAmount) {
      return res.json({
        message: "Insufficient balance"
      });
    }

    user.balance -= betAmount;

    const result = generateResult();

    let winAmount = 0;

    if (result === "win") {

      winAmount = betAmount * 2;

      user.balance += winAmount;

    }

    await user.save();

    const log = new GameLog({

      playerCode,
      game,
      betAmount,
      result,
      winAmount,
      balanceAfter: user.balance

    });

    await log.save();

    res.json({

      result,
      winAmount,
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
