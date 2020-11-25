const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  _id:{type:Number, required:true}, // barcode
  img:  {type:String}, 
  mrp: {type:String},
  rate: {type:String},
  name: {type:String},
  // description: {type:String},
  // reviews: {type:String},
  // rating: {type:String},
  // headline: {type:String}

});

module.exports = mongoose.model('item', itemSchema);
