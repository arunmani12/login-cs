const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require('../models/UserModel')

router.post("/", async (req, res) => {

    if(!req.body.user){
        console.log(req.body)
      return res.status(401).send("please send user data");
    }

    const { UserId, password } = req.body.user;
  
    if (password.length < 4) {
      return res.status(401).send("Password must be atleast 4 characters");
    }
  
    try {
      const user = await UserModel.findOne({ UserId }).select(
        "+password"
      );
  
      if (!user) {
        return res.status(401).send("Invalid Credentials");
      }
  
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        return res.status(401).send("Invalid Credentials");
      }
  
      const payload = { userId: user._id };
      jwt.sign(payload, process.env.jwtSecret, { expiresIn: "2d" }, (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send(`Server error`);
    }
  });



module.exports = router