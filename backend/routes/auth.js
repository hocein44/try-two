// /routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' }); // ✅ Return JSON
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' }); // ✅ JSON response instead of plain text
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // ✅ Proper JSON error handling
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send('User not found');
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid credentials');
  }

  // Create JWT
  const token = jwt.sign({ userId: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });

  res.json({ token, role: user.role });
});

// Protected route
router.get('/dashboard', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    
    if (decoded.role === 'admin') {
      return res.send('Admin Dashboard');
    } else {
      return res.send('User Dashboard');
    }
  });
});

module.exports = router;
