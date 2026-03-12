const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("YOUR_MONGODB_CONNECTION");

app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
