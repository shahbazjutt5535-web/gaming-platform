const express = require("express");
const router = express.Router();

const User = require("../models/User");
const GameLog = require("../models/GameLog");

/*
POST GAME RESULT
Handles betting and payouts
*/

router.post("/result", async (req, res) => {

  try {

    const { playerCode, game, betAmount, result } = req.body;

    /* ============================
    VALIDATION
    ============================ */

    if (!playerCode || !betAmount || !result) {
      return res.json({
        message: "Missing required data"
      });
    }

    if (betAmount <= 0) {
      return res.json({
        message: "Invalid bet amount"
      });
    }

    const user = await User.findOne({ playerCode });

    if (!user) {
      return res.json({
        message: "User not found"
      });
    }

    /* ============================
    CHECK BALANCE
    ============================ */

    if (user.balance < betAmount) {

      return res.json({
        message: "Insufficient balance",
        balance: user.balance
      });

    }

    /* ============================
    DEDUCT BET
    ============================ */

    user.balance -= betAmount;

    let winAmount = 0;

    /* ============================
    WIN CALCULATION
    ============================ */

    if (result === "win") {

      winAmount = betAmount * 2;

      user.balance += winAmount;

    }

    await user.save();

    /* ============================
    SAVE GAME LOG
    ============================ */

    const log = new GameLog({

      playerCode: playerCode,
      game: game || "Unknown",
      betAmount: betAmount,
      result: result,
      winAmount: winAmount,
      balanceAfter: user.balance

    });

    await log.save();

    /* ============================
    RESPONSE
    ============================ */

    res.json({

      message: "Game processed",
      result: result,
      betAmount: betAmount,
      winAmount: winAmount,
      balance: user.balance

    });

  } catch (error) {

    console.error("Game Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

});

module.exports = router;
