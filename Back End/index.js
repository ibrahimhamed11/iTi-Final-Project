require('./config/config')
const express = require('express');
const mongoose = require('mongoose');


const usersRouter = require('./routes/users');

const productRouter = require('./routes/productsRouter');
const ordersRouter = require('./routes/ordersRouter')
const blogsRouter = require("./routes/BlogPost")
const commentsRouter = require('./routes/comments');
const todoRouter = require('./routes/todoRoute');

const app = express();
const cors= require('cors');


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
 app.use('/user',usersRouter);

//Products router
 app.use('/products',productRouter)
 app.use('/blogs',blogsRouter)
 app.use('/comments',commentsRouter)

//Orders Route 
app.use('/orders',ordersRouter);

//Todo Route 
app.use('/todo',todoRouter);




// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


