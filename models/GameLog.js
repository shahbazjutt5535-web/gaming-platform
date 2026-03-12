const mongoose = require("mongoose");

const GameLogSchema = new mongoose.Schema({

  playerCode: {
    type: String,
    required: true
  },

  game: {
    type: String,
    required: true
  },

  betAmount: {
    type: Number,
    required: true
  },

  result: {
    type: String,
    enum: ["win", "lose"],
    required: true
  },

  winAmount: {
    type: Number,
    default: 0
  },

  balanceAfter: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("GameLog", GameLogSchema);
