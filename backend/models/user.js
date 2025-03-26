const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;