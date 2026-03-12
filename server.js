// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// === MongoDB connection ===
const mongoURI = "mongodb+srv://shahbazjutt5535_db_user:<1cSp0RSmgSyxoBOE@cluster01.rkezxw2.mongodb.net/gamingDB";

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);

// Start server
const PORT = 3000; // or any port you like
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
