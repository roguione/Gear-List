// models/gear.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gearSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model('Gear', gearSchema);

