const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id:{type:Number, required:true},
  mob_Num:{type:Number },
  email:{type:String },
  name: { type: String},
  cartItems:{type:Array},
  addresses:{type:Array}
});

module.exports = mongoose.model('User', userSchema);
