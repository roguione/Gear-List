// Gear-List/gserver.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const gearRouter = require('./routes/gear');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing POST request bodies
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using environment variable
const { MONGODB_URL, PORT } = process.env;
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:; font-src 'self' data:;"
  );
  next();
});

// Routes
app.use('/', gearRouter);

const port = PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 404 route handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

