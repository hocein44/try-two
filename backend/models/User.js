// /models/User.js
const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
