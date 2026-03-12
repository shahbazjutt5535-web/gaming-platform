const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  name: String,
  game: String,
  prizePool: Number,
  players: [String], // playerCodes
  winners: [String]
});

module.exports = mongoose.model("Tournament", TournamentSchema);
