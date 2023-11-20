// models/gear.js
const mongoose = require('mongoose');

const gearSchema = new mongoose.Schema({
  name: String,
  category: String,
});

const Gear = mongoose.model('Gear', gearSchema);

module.exports = Gear;
