const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({
  _id:{type:Number, required:true},
  img: { type: String },
  barcode: { type: String },


});

module.exports = mongoose.model('Banner', bannerSchema);
