const express = require("express");
const router = express.Router();

const PlatformSettings = require("../models/PlatformSettings");

/* =========================
GAME RESULT ENGINE
========================= */

async function generateResult() {

  const settings = await PlatformSettings.findOne();

  const winChance = settings ? settings.winProbability : 0.48;

  const random = Math.random();

  if (random < winChance) {
    return "win";
  }

  return "lose";
}

/* =========================
PLAY GAME
========================= */

router.post("/play", async (req, res) => {

  try {

    const { playerCode, betAmount } = req.body;

    if (!playerCode || !betAmount) {
      return res.status(400).json({
        message: "Missing playerCode or betAmount"
      });
    }

    const result = await generateResult();

    let winAmount = 0;

    if (result === "win") {
      winAmount = betAmount * 2;
    }

    res.json({
      result: result,
      winAmount: winAmount,
      balance: 0
    });

  } catch (error) {

    console.error("Game error:", error);

    res.status(500).json({
      message: "Game server error"
    });

  }

});

/* =========================
EXPORT ROUTER
========================= */

module.exports = router;
