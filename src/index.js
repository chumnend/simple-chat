'use strict';

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('./config');
const socket = require('./socket');

// initilaize the application
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
if (config.env !== 'test') {
  app.use(morgan('common'));
}

// setup application routes
app.get('/', (req, res) => {
  res.render('room');
});

// add sockets
const server = socket(app);

// listen to server
server.listen(config.port, () => {
  console.log('Server started on port', config.port);
});

module.exports = server;
