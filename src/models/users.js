const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id:{type:Number, required:true},
  phone:{type:Number },
  email:{type:String },
  displayPic:  {type:String}, 
  firstName: { type: String},
  lastName: { type: String},
  cartItems:{type:Array},
  addresses:{type:Array}
});

module.exports = mongoose.model('User', userSchema);
