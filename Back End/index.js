require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');

const app = express();



// Middleware
app.use(express.json());

// Routes
app.use(router);

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
