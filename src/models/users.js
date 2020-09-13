const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id:{type:Number, required:true},
  name: { type: String, required: true },
  cartItems:{type:Array}


});

module.exports = mongoose.model('User', userSchema);
