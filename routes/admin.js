const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "username email playerCode balance -_id");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

module.exports = router;
