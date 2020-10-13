const mongoose = require('mongoose');

const userslengthSchema = mongoose.Schema({
  _id:{type:Number, required:true},
  ID:{type:Number},



});

module.exports = mongoose.model('userslength', userslengthSchema);
