// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Routes
const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const gameRoutes = require("./routes/game");
const withdrawRoutes = require("./routes/withdraw");
const adminRoutes = require("./routes/admin");
const tournamentRoutes = require("./routes/tournament");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

/* =========================
CORS CONFIG
Allow Blogger frontend
========================= */

app.use(cors({
  origin: "*", // allow all domains; optionally restrict to your blog URL for security
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(express.json());

/* =========================
STATIC FILES
Games + Admin panel + new frontend files
========================= */

// Existing game files
app.use("/games", express.static(path.join(__dirname, "public/games")));

// Existing admin panel
app.use("/admin", express.static(path.join(__dirname, "admin")));

// Optional: New blogger frontend files if needed
// Place any new HTML/JS/CSS for Blogger here
app.use("/blogger", express.static(path.join(__dirname, "public/blogger")));

/* =========================
MongoDB connection
========================= */

const mongoURI = "mongodb+srv://shahbazjutt5535_db_user:1cSp0RSmgSyxoBOE@cluster01.rkezxw2.mongodb.net/gamingDB";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

/* =========================
API ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/withdraw", withdrawRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tournament", tournamentRoutes); 
app.use("/api/leaderboard", leaderboardRoutes);

/* =========================
ROOT
========================= */

app.get("/", (req, res) => {
  res.send("🎮 Gaming Platform Backend is running");
});

/* =========================
ERROR HANDLER
Optional: Return JSON if route not found
========================= */

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* =========================
SERVER START
========================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
