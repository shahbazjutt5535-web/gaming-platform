const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

function generatePlayerId() {
  return "P" + Math.floor(100000 + Math.random() * 900000);
}

router.post("/register", async (req, res) => {

  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
    playerId: generatePlayerId()
  });

  await user.save();

  res.json({
    message: "Account created",
    playerId: user.playerId
  });

});

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  res.json({
    playerId: user.playerId,
    balance: user.balance
  });

});

module.exports = router;
