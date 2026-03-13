const mongoose = require("mongoose");

const WithdrawSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: String,
  amount: Number,
  wallet: String,
  chain: String, // TRC20 / ERC20 / BEP20
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Withdraw", WithdrawSchema);
