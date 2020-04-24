const mongoose = require('mongoose');

const User = mongoose.Schema({
  name: String,
  number: Number
});

module.exports = mongoose.model('User', User);
