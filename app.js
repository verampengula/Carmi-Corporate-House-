const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', require('./routes/index'));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
