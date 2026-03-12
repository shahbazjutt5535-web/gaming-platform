const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  username: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  playerCode: String,

  balance: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model("User", UserSchema);
