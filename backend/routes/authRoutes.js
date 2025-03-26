const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');      

const SECRET_KEY = 'your_secret_key';

// Register New User (POST /auth/register)
router.post('/register', async (req, res) => {
    try {
      const { userID, password, role } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ userID });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({
        userID,
        password: hashedPassword,
        role
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { userID, password } = req.body;
    try {
        const user = await User.findOne({ userID });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userID: user.userID, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Fetch All Users with Delay (Admin Only)
router.get('/users', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    const delay = parseInt(req.query.delay) || 0; // Get delay from query, default to 0 if not provided

    try {
        const users = await User.find();

        // Simulate delay
        setTimeout(() => {
            res.status(200).json(users);
        }, delay);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Add New User (Admin Only)
router.post('/users', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    const { UserID, Password, Role } = req.body;
    try {
        const newUser = new User({ UserID, Password, Role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete User (Admin Only)
router.delete('/users/:id', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
