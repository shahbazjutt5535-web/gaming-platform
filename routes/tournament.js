const express = require("express");
const router = express.Router();
const Tournament = require("../models/Tournament");

// Create tournament
router.post("/create", async (req, res) => {
  const { name, game, prizePool } = req.body;
  const t = new Tournament({ name, game, prizePool, players: [], winners: [] });
  await t.save();
  res.json({ message: "Tournament created", tournament: t });
});

module.exports = router;
