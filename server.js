const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const emailsRouter = require('./models/emails'); // Assuming your emails router is correctly implemented in emails.js

const app = express();
const PORT = 3000;

// Use CORS middleware to allow all origins during development
app.use(cors());

// MongoDB connection with options
mongoose.connect('mongodb://localhost:27017/email_subscriptions', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware for parsing JSON bodies
app.use(express.json());

// Use the emailsRouter for handling email-related routes
app.use('/emails', emailsRouter); // Assuming your emails router is set up to handle routes starting with '/emails'

// POST route for subscribing emails
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (email) {
    try {
      // Your logic to handle email subscription
      // For demonstration, just sending a success response
      res.status(200).json({ message: 'Subscription successful!', email: email });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
  } else {
    res.status(400).json({ error: 'Email is required.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
