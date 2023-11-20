// Gear-List/app.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const db = mongoose.connection;

const app = express();


mongoose.connect('mongodb://your-mongodb-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define a route for the "new" page
app.get('/new', (req, res) => {
  res.render('new');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

