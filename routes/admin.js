const express = require("express");
const router = express.Router();

const User = require("../models/User");
const GameLog = require("../models/GameLog");
const PlatformSettings = require("../models/PlatformSettings");


/* ==========================
ALL USERS
========================== */

router.get("/users", async (req, res) => {

  try {

    const users = await User.find({}, "-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching users",
      error: error.message
    });

  }

});


/* ==========================
GAME LOGS
========================== */

router.get("/games", async (req, res) => {

  try {

    const logs = await GameLog
      .find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(logs);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching logs",
      error: error.message
    });

  }

});


/* ==========================
TOTAL PLATFORM STATS
========================== */

router.get("/stats", async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();

    const totalBalance = await User.aggregate([
      { $group: { _id: null, total: { $sum: "$balance" } } }
    ]);

    const totalBets = await GameLog.aggregate([
      { $group: { _id: null, total: { $sum: "$betAmount" } } }
    ]);

    const totalWins = await GameLog.aggregate([
      { $group: { _id: null, total: { $sum: "$winAmount" } } }
    ]);

    const profit =
      (totalBets[0]?.total || 0) - (totalWins[0]?.total || 0);

    res.json({
      users: totalUsers,
      totalBalance: totalBalance[0]?.total || 0,
      totalBets: totalBets[0]?.total || 0,
      totalWins: totalWins[0]?.total || 0,
      profit: profit
    });

  } catch (error) {

    res.status(500).json({
      message: "Stats error",
      error: error.message
    });

  }

});


/* ==========================
SET WIN PROBABILITY
(Admin Profit Control)
========================== */

router.post("/set-winrate", async (req, res) => {

  try {

    const { winProbability } = req.body;

    let settings = await PlatformSettings.findOne();

    if (!settings) {

      settings = new PlatformSettings({
        winProbability
      });

    } else {

      settings.winProbability = winProbability;

    }

    await settings.save();

    res.json({
      message: "Win probability updated",
      winProbability
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to update winrate",
      error: error.message
    });

  }

});


/* ==========================
GET CURRENT WIN RATE
========================== */

router.get("/winrate", async (req, res) => {

  try {

    const settings = await PlatformSettings.findOne();

    res.json({
      winProbability: settings?.winProbability || 0.48
    });

  } catch (error) {

    res.status(500).json({
      message: "Error getting winrate"
    });

  }

});


/* ==========================
LEADERBOARD
========================== */

router.get("/leaderboard", async (req, res) => {

  try {

    const leaders = await User
      .find({})
      .sort({ balance: -1 })
      .limit(20)
      .select("username playerCode balance");

    res.json(leaders);

  } catch (error) {

    res.status(500).json({
      message: "Leaderboard error",
      error: error.message
    });

  }

});


module.exports = router;
