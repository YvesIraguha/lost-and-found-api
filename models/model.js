const mongoose = require('mongoose');

const Lost = mongoose.Schema({
  name: String,
  number: Number
});

module.exports = mongoose.model('lost', Lost);
