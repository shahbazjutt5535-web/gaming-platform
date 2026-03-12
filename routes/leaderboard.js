const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", async (req, res) => {

  const leaders = await User
    .find({})
    .sort({ balance: -1 })
    .limit(20)
    .select("username playerCode balance");

  res.json(leaders);

});

module.exports = router;
