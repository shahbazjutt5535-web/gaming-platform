const express = require("express");
const router = express.Router();

const User = require("../models/User");
const GameLog = require("../models/GameLog");

/* ==========================
ALL USERS
========================== */

router.get("/users", async (req, res) => {

  const users = await User.find({}, "-password");

  res.json(users);

});

/* ==========================
GAME LOGS
========================== */

router.get("/games", async (req, res) => {

  const logs = await GameLog
    .find()
    .sort({ createdAt: -1 })
    .limit(100);

  res.json(logs);

});

/* ==========================
TOTAL PLATFORM STATS
========================== */

router.get("/stats", async (req, res) => {

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

  res.json({
    users: totalUsers,
    totalBalance: totalBalance[0]?.total || 0,
    totalBets: totalBets[0]?.total || 0,
    totalWins: totalWins[0]?.total || 0
  });

});

module.exports = router;
