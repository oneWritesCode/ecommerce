require("dotenv").config();

const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();
const cookieParser = require("cookie-parser");
const auth = require("../middleware/auth");

const JWT_SECRET =
  process.env.JWT_SECRET || "something-shitty-called-EcommmerceWebApplication";

// Signup

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userCheck = await User.findOne({ email });

    if (userCheck) return res.status(400).json({ error: "User already exists" });
    await User.create({
      name,
      email,
      password,
    });
    return res.json({ "user created with name": name });
  } catch (error) {
    return "something sucks :: error :", error;
  }
});

// Login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log("Setting cookie with token:", token.substring(0, 20) + "...");

    res.cookie("token", token, {
      httpOnly: true,
    });

    console.log("Cookie set, redirecting...");
    return res.json("user logged in :: apna hi banda h tu toh :: ");
  } catch (error) {
    console.log("Login error:", error);
    return res.render("signin", { error: "Incorrect Email or password" });
  }
});

//logout
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token"); // Clear the token cookie
    return res.json("user logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "Failed to log out" });
  }
});

// Get current user info (protected route)
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
