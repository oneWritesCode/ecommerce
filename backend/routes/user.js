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
  await User.create({
    name, email, password
  })
  return res.redirect('/')
})


// Login
router.post("/login", async (req, res) => {

  // ________________________________first by idhar udhar_____________________________________________________
  // const { email, password } = req.body;
  // try {
  //   const user = await User.findOne({ email });
  //   if (!user) {
  //     return res.status(400).json({ error: "Invalid credentials" });
  //   }
  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) {
  //     return res.status(400).json({ error: "Invalid credentials" });
  //   }
  //   const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "170h" });

  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production", // set to true in production
  //   sameSite: "strict",
  //   maxAge: 170 * 60 * 60 * 1000 // 170 hours in ms
  // });

  //   res.json({ user: { id: user._id, name: user.name, email: user.email } });
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).json({ error: "Database error" });
  // }



  // _________________________________________second cpied paste___________________________________________________________________________________________
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // set to true in production
      sameSite: "strict",
      maxAge: 170 * 60 * 60 * 1000 // 170 hours in ms
    }).redirect('/');

  } catch (error) {
    return res.redirect("/login", { error: "Incorrect Email or password" })
  }


// ____________________________________third by neeraj________________________________________________________________

  // try {
  //   const token = await User.matchPasswordAndGenerateToken(email, password);
  //   console.log("Setting cookie with token:", token.substring(0, 20) + "...");
    
  //   res.cookie('token', token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     sameSite: "strict",
  //     maxAge: 170 * 60 * 60 * 1000
  //   });
    
  //   console.log("Cookie set, redirecting...");
  //   return res.redirect('/');
  // } catch (error) {
  //   console.log("Login error:", error);
  //   return res.render("signin", { error: "Incorrect Email or password" });
  // }





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
