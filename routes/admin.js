const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin"); // admin schema
const jwt = require("jsonwebtoken");

const SECRET = "YOUR_ADMIN_JWT_SECRET"; // store in .env ideally

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if(!admin || admin.password !== password){
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: admin._id }, SECRET, { expiresIn: "12h" });
  res.json({ token });
});

module.exports = router;
