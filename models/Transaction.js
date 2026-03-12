// models/Transaction.js
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["bet", "win", "deposit", "withdraw"], required: true },
    amount: { type: Number, required: true },
    game: { type: String }, // optional: name of the game
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
