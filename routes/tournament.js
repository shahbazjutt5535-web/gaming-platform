// routes/tournament.js
const express = require("express");
const router = express.Router();

// Example: create tournament
router.post("/create", async (req, res) => {
    // your tournament creation logic here
    res.json({ message: "Tournament created successfully!" });
});

// Example: list tournaments
router.get("/list", async (req, res) => {
    // fetch tournaments from DB (placeholder)
    res.json([{ id: 1, name: "Weekly Tournament" }]);
});

module.exports = router; // ✅ export router correctly
