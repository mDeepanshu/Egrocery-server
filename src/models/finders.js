const mongoose = require('mongoose');

const finderSchema = mongoose.Schema({
  _id:{type:Number, required:true}, // barcode
  name:  {type:String}, 
  completedOrdersArr: [String],
  ordersArr: [String]


});

module.exports = mongoose.model('finder', finderSchema);
