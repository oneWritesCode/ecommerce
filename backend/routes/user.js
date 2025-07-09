const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();
const cookieParser = require('cookie-parser');
const auth = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || "something-shitty-called-EcommmerceWebApplication";

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json({ message: "User created", user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "170h" });

    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // set to true in production
      sameSite: "strict",
      maxAge: 170 * 60 * 60 * 1000 // 170 hours in ms
    });

    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// Get current user info (protected route)
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
