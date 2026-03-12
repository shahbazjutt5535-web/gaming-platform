const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({

  name: String,

  prizePool: Number,

  game: String,

  players: [String],

  startTime: Date,

  endTime: Date

});

module.exports = mongoose.model("Tournament", TournamentSchema);
