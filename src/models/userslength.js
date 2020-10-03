const mongoose = require('mongoose');

const userslengthSchema = mongoose.Schema({
  _id:{type:Number, required:true},


});

module.exports = mongoose.model('userslength', userslengthSchema);
