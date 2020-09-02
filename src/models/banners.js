const mongoose = require('mongoose');
const { Binary } = require('mongodb');

const bannerSchema = mongoose.Schema({
  _id:{type:Number, required:true},
  img: { type: Buffer},
  barcode: { type: String },


});

module.exports = mongoose.model('Banner', bannerSchema);
