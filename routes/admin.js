const express = require("express");
const router = express.Router();

const User = require("../models/User");

/* GET ALL USERS */

router.get("/users", async (req,res)=>{

try{

const users = await User.find().select("username playerCode balance");

res.json(users);

}catch(err){

res.status(500).json({error:err.message});

}

});


/* UPDATE USER BALANCE */

router.post("/update-balance", async (req,res)=>{

try{

const {playerCode,amount} = req.body;

const user = await User.findOne({playerCode});

if(!user){

return res.json({message:"User not found"});

}

user.balance = Number(amount);

await user.save();

res.json({message:"Balance updated"});

}catch(err){

res.status(500).json({error:err.message});

}

});


module.exports = router;
