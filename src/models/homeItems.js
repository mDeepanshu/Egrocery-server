const mongoose = require('mongoose');

const homeItemSchema = mongoose.Schema({
  _id:{type:Number, required:true},
  img: { type: Buffer},
  barcode: { type: String, required: true },


});

module.exports = mongoose.model('homeItem', homeItemSchema);
