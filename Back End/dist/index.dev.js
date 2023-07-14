"use strict";

require('./config/config');

var express = require('express');

var http = require('http');

var app = express(); //soket server 

var server = http.createServer(app);

var io = require('./Socket.js').init(server);

var bodyparser = require('body-parser');

var usersRouter = require('./routes/users');

var chartsRouter = require('./routes/charts');

var CartRouter = require('./routes/cart');

var productRouter = require('./routes/productsRouter');

var ordersRouter = require('./routes/ordersRouter');

var blogsRouter = require("./routes/BlogPost");

var commentsRouter = require('./routes/comments');

var todoRouter = require('./routes/todoRoute');

var vaccinationRouter = require('./routes/vaccination');

var notificationRouter = require('./routes/notificationRoutes');

var cors = require('cors');

var path = require('path'); // Middleware


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"](path.join(__dirname, './uploads'))); // app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());
// Routes

app.use('/user', usersRouter); //Products router

app.use('/products', productRouter);
app.use('/blogs', blogsRouter);
app.use('/comments', commentsRouter); //Orders Route 

app.use('/orders', ordersRouter); //Todo Route 

app.use('/todo', todoRouter); // vaccination 

app.use('/vaccination', vaccinationRouter);
app.use('/cart', CartRouter); //charts

app.use('/charts', chartsRouter); //vaccination 

app.use('/vaccination', vaccinationRouter); //notfications

app.use('/notification', notificationRouter);
var PORT = 4000; //Soket Server

io.on('connection', function (socket) {
  console.log('Client connected');
}); // Start the server

server.listen(PORT, function () {
  console.log("Server listening on port ".concat(PORT));
});