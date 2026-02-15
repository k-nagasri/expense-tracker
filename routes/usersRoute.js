import express from "express";
import userModel from "../models/User.js";

const router = express.Router();

router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const userObj = user.toObject();
    delete userObj.password;
    res.json({ message: "Login successful", user: userObj });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/register", async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    await new userModel({ name, email, password }).save();
    res.status(201).json({
      message: "User registered successfully",
      newUser: new userModel({ name, email, password }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
