'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Record = new Schema({
  timestamp: { type: Date, default: Date.now },
  value: { type: Number, required: true }
});

module.exports = mongoose.model('Record', Record);