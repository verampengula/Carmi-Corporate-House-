const express = require('express');
const router = express.Router();
const Email = require('../models/Email'); // Import the Email model

// Handle POST requests to /subscribe
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (email) {
    try {
      // Save the email to the database using the Email model
      const newEmail = await Email.create({ email });
      res.status(200).json({ message: 'Subscription successful!', data: newEmail });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
  } else {
    res.status(400).json({ error: 'Email is required.' });
  }
});

module.exports = router;
