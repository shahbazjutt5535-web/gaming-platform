// routes/admin.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Deposit = require("../models/Deposit");
const Withdraw = require("../models/Withdraw");
const AdminSettings = require("../models/AdminSettings"); // For win probability

const ADMIN_EMAIL = "admin";   // <-- replace with your admin email
const ADMIN_PASSWORD = "admin";      // <-- replace with your admin password
const JWT_SECRET = "YOUR_SECRET_KEY";      // <-- secret key for JWT

/* =======================
ADMIN LOGIN
POST /api/admin/login
======================= */
router.post("/login", (req,res)=>{
  const {email, password} = req.body;
  if(email===ADMIN_EMAIL && password===ADMIN_PASSWORD){
    const token = jwt.sign({email}, JWT_SECRET, {expiresIn:"12h"});
    res.json({token, email});
  } else {
    res.status(401).json({message:"Invalid credentials"});
  }
});

/* =======================
GET ALL USERS
GET /api/admin/users
======================= */
router.get("/users", async (req,res)=>{
  try{
    const users = await User.find().select("username email playerCode balance totalBets totalWins");
    res.json(users);
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

/* =======================
UPDATE USER BALANCE
POST /api/admin/update-balance
======================= */
router.post("/update-balance", async (req,res)=>{
  try{
    const {playerCode, amount} = req.body;
    const user = await User.findOne({playerCode});
    if(!user) return res.status(404).json({message:"User not found"});
    user.balance = Number(amount);
    await user.save();
    res.json({message:"Balance updated"});
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

/* =======================
GET ALL DEPOSITS
GET /api/admin/deposits
======================= */
router.get("/deposits", async (req,res)=>{
  try{
    const deposits = await Deposit.find().populate("user","username playerCode");
    res.json(deposits);
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

/* =======================
GET ALL WITHDRAWS
GET /api/admin/withdraws
======================= */
router.get("/withdraws", async (req,res)=>{
  try{
    const withdraws = await Withdraw.find().populate("user","username playerCode");
    res.json(withdraws);
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

/* =======================
APPROVE WITHDRAW
POST /api/admin/approve-withdraw
======================= */
router.post("/approve-withdraw", async (req,res)=>{
  try{
    const {withdrawId} = req.body;
    const wd = await Withdraw.findById(withdrawId);
    if(!wd) return res.status(404).json({message:"Withdraw not found"});
    wd.status = "approved";
    await wd.save();

    // Optionally subtract balance from user
    const user = await User.findById(wd.user);
    if(user) {
      user.balance -= wd.amount;
      await user.save();
    }

    res.json({message:"Withdraw approved"});
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

/* =======================
WIN PROBABILITY
POST /api/admin/winprob
======================= */
router.post("/winprob", async (req,res)=>{
  try{
    const {winProbability} = req.body;
    let setting = await AdminSettings.findOne();
    if(!setting){
      setting = new AdminSettings({winProbability});
    } else {
      setting.winProbability = winProbability;
    }
    await setting.save();
    res.json({message:"Win probability updated"});
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

/* =======================
LEADERBOARD
GET /api/admin/leaderboard
======================= */
router.get("/leaderboard", async (req,res)=>{
  try{
    const topUsers = await User.find().sort({balance:-1}).limit(10).select("username balance");
    res.json(topUsers);
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

module.exports = router;
