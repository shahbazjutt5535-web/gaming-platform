const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const gameRoutes = require("./routes/game");
const withdrawRoutes = require("./routes/withdraw");

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://shahbazjutt5535_db_user:1cSp0RSmgSyxoBOE@cluster01.rkezxw2.mongodb.net/gamingDB";

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/withdraw", withdrawRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
