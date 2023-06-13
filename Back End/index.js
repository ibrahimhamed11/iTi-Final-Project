require('./config/config')
const express = require('express');
const bodyparser = require('body-parser');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/productsRouter');
const ordersRouter = require('./routes/ordersRouter')
const blogsRouter = require("./routes/BlogPost")
const commentsRouter = require('./routes/comments');
const todoRouter = require('./routes/todoRoute');
const vaccinationRouter = require('./routes/vaccination');
const CartRouter = require('./routes/cart');

const app = express();
const cors= require('cors');
const path=require('path');


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());
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

//vaccination 
app.use('/vaccination',vaccinationRouter);
app.use('/cart',CartRouter);


// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


