const mongoose = require('mongoose');

const homeItemSchema = mongoose.Schema({
  _id:{type:Number, required:true}, // barcode
  img: { type: String}, 
  name: {type:String},


});

module.exports = mongoose.model('homeItem', homeItemSchema);
