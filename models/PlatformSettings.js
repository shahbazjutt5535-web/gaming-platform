const mongoose = require("mongoose");

const PlatformSettingsSchema = new mongoose.Schema({

  winProbability: {
    type: Number,
    default: 0.48
  },

  maxWinMultiplier: {
    type: Number,
    default: 2
  }

});

module.exports = mongoose.model("PlatformSettings", PlatformSettingsSchema);
