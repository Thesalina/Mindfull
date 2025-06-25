const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
// Adjust the path as necessary

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const {Backenduser}=useAuth();
  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});



// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  //const user=await User.findOne({email});
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;
