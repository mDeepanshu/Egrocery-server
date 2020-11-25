const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id:  {type:Number, required:true}, // barcode
  items:  [{
      itemId:{type:String},
      amount:{type:Number}
  }],
  shopId:  {type:String},
  finderId: {type:String},
  findTimeStart: {type:Date},
  findTimeEnd: {type:Date},
  deliverManId:{type:String},
  pickUpTime:{type:Date},
  deliveryTime:{type:Date},
  customerId:{type:String},
  itemsId:[String],
  amount:[Number]



});

module.exports = mongoose.model('order', orderSchema);
