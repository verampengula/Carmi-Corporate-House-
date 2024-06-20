const express = require('express');
const router = express.Router();
const Email = require('../models/emails'); // Ensure correct path to Email model
const mongoose = require('mongoose');

// MongoDB connection setup with error handling
mongoose.connect('mongodb://localhost:27017/email_subscriptions', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err)); // Log connection errors

// POST route for subscribing emails
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    // Example validation: Check if email is provided
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required.' });
    }

    // Example validation: Check if email format is valid (you can add more validation as needed)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format.' });
    }

    // Create new email record using Mongoose
    const newEmail = await Email.create({ email });
    res.status(201).json({ success: true, data: newEmail });
  } catch (err) {
    // Handle any errors during email creation or validation
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
