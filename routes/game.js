// routes/game.js
const express = require("express");
const router = express.Router();

const PlatformSettings = require("../models/PlatformSettings");
const User = require("../models/User");

/* =========================
GAME RESULT ENGINE
========================= */
async function generateResult() {
  const settings = await PlatformSettings.findOne();
  const winChance = settings ? settings.winProbability : 0.48;
  const random = Math.random();
  return random < winChance ? "win" : "lose";
}

/* =========================
PLAY GAME
POST /api/game/play
========================= */
router.post("/play", async (req, res) => {
  try {
    const { playerCode, betAmount, gameType } = req.body;

    if (!playerCode || !betAmount) {
      return res.status(400).json({ message: "Missing playerCode or betAmount" });
    }

    const user = await User.findOne({ playerCode });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.balance < betAmount) return res.status(400).json({ message: "Insufficient balance" });

    let result = "";
    let winnings = 0;

    // =========================
    // Game Engine Logic
    // =========================
    if (gameType === "dice") {
      const roll = Math.floor(Math.random() * 6) + 1;
      result = roll;
      if (roll >= 5) winnings = betAmount * 2;  // win double if roll 5 or 6
    } else if (gameType === "slot") {
      const symbols = ["🍒","🍋","🍊","7"];
      const reel = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];
      result = reel.join(" ");
      if (reel[0] === reel[1] && reel[1] === reel[2]) winnings = betAmount * 5; // jackpot
    } else if (gameType === "crash") {
      const multiplier = (Math.random() * 4 + 1).toFixed(2); // 1x to 5x
      result = multiplier;
      winnings = betAmount * multiplier;
    } else {
      // Default: juwa logic based on winProbability
      const gameResult = await generateResult();
      result = gameResult;
      if (gameResult === "win") winnings = betAmount * 2;
    }

    // =========================
    // Update User Balance
    // =========================
    user.balance = user.balance - betAmount + winnings;
    await user.save();

    res.json({
      result,
      winnings,
      balance: user.balance
    });

  } catch (error) {
    console.error("Game error:", error);
    res.status(500).json({ message: "Game server error", error: error.message });
  }
});

module.exports = router;
