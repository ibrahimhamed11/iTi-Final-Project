const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const userRoutes = require('./routes/users')

const app = express();
 app.use(express.json());
app.use('/user' , userRoutes)

 mongoose
  .connect(
    'mongodb://0.0.0.0/finalProject'
  )
  .then(result => {
    app.listen(8080);
    console.log("server started")
  })
  .catch(err => console.log(err));