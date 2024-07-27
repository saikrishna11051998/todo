const express = require("express");
const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Sign up
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User Already Exists" });
        }

        // Hash the password
        const hashpassword = bcrypt.hashSync(password);

        // Create and save the new user
        const user = new User({ email, username, password: hashpassword });
        await user.save();

        res.status(200).json({ message: "Sign up Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Sign In
router.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Please Sign Up First" });
      }
  
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Password not Correct" });
      }
  
      const { password: _, ...others } = user._doc; // Exclude password from response
      res.status(200).json({ others });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  });

module.exports = router;
