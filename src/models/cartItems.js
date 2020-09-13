const mongoose = require('mongoose');

const cartItemsSchema = mongoose.Schema({
  _id:{type:Number, required:true},
  img: { type: String },


});

module.exports = mongoose.model('CartItems', cartItemsSchema);
