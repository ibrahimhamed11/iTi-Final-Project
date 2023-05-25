require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');

// Routes
const usersRouter = require('./routes/users');
const productRouter = require('./routes/productsRouter');
const ordersRouter = require('./routes/ordersRouter');
const blogsRouter = require('./routes/BlogPost');

const app = express();
const cors= require('cors');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/orders', ordersRouter);
app.use('/blogs', blogsRouter);
