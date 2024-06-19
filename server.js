const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/travelAgency', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Mongoose schema and model
const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// API endpoint to handle subscriptions
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.status(201).send({ message: 'Subscription successful' });
  } catch (error) {
    res.status(400).send({ message: 'Error subscribing', error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
