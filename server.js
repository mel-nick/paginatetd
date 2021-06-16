require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 5003;
const app = express();

// Init Middleware
app.use(
  express.json({
    extended: false,
  })
);

// headers

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//define routes
app.use('/api/users', require('./routes/api/users'));

//serve statisc assets
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Mongoose connection
const db = mongoose.connection;

//mongoose connect
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Check connection
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', function (err) {
  console.error(err);
});

//app listen
app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port: ${PORT}`);
});
