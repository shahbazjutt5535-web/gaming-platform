// routes/tournament.js
const express = require("express");
const router = express.Router();

// Example: create tournament
router.post("/create", async (req, res) => {
  try {
    const { name, prize } = req.body;
    // Save tournament in DB here (example)
    res.json({ message: `Tournament ${name} with prize ${prize} created!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Example: list tournaments
router.get("/list", async (req, res) => {
  // Fetch tournaments from DB
  res.json({ tournaments: [] });
});

module.exports = router;
