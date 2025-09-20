const bcrypt = require('bcrypt');
const User = require('../models/User');

const authController = {
  // Register new user
  register: async (req, res) => {
    try {
      const { admin, password } = req.body;
      
      if (!admin || !password) {
        return res.status(400).json({ message: 'Admin username and password are required' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        admin,
        password: hashedPassword
      });

      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 11000) {
        return res.status(409).json({ message: 'Admin username already exists' });
      }
      res.status(500).json({ message: 'Server error during registration' });
    }
  },

  // Login user
  login: async (req, res) => {
    try {
      const { admin, password } = req.body;

      if (!admin || !password) {
        return res.status(400).json({ message: 'Admin username and password are required' });
      }

      const user = await User.findOne({ admin });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      res.status(200).json({ 
        message: 'Login successful',
        user: {
          id: user._id,
          admin: user.admin
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  }
};

module.exports = authController;