require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');
const productRouter = require('./routes/productsRouter')
const app = express();
const cors= require('cors');



// Middleware
app.use(cors()) //Added cors for allowing 
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// Routes
app.use(router);

//Products router
app.use('/products',productRouter)