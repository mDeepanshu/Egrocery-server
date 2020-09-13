const express = require('express')
const multer = require('multer')
// const fileUpload = require('express-fileupload')
// const mongodb = require('mongodb')
// const fs = require('fs')
// const binary = mongodb.Binary

const User = require('./models/users');
const Banner = require('./models/banners');
const HomeItems = require('./models/homeItems');
const Items = require('./models/items')
 
// var allBanners;
const allBanners =  Banner.find();

require('./db/mongoose')

const app = express()
const port = process.env.PORT

var lumos = 5;
var bannerId = {id:4} ;
var itemId   = {id:7};
var arr = {a:0,b:1,c:2}

app.use(express.json())
// app.use(fileUpload())
// async function onStart(){
//   // this.allBanners = banners
//   this.allBanners = 1;
//   console.log(this.allBanners);
// }
const upload = multer({
  
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error('Please upload an image'))
      }

      cb(undefined, true)
  }
})
app.post("/addBanner",upload.single('avatar'),  async(req, res) => {
  
  // console.log(req.file.buffer.toString("base64"));
  // console.log(req);

  let b64 = new Buffer(req.file.buffer).toString("base64");
  const banner = new Banner({
    _id:bannerId.id,
    img:b64,
    barcode:""
  })
  await banner.save()
  bannerId = bannerId+1
  res.send(banner)

})

app.get('/getBanner', async (req, res) => {
  const banners = await Banner.find();
    res.send(banners)

})
app.get('/', async (req, res) => {
  //  await onStart();
    res.send('Lets Go...!')
})

app.get('/variable', (req, res) => {
  res.send(arr)
  arr.a=arr.a+1
  arr.b=arr.b+1
  arr.c=arr.c+1
})

app.get('/items', async (req, res) => {
  const homeItems = await HomeItems.find() 
  res.send(homeItems);
 
})

app.post('/addHomeItems',upload.single('avatar'), async (req, res) => {
  console.log(req.body.name);
  let b64 = new Buffer(req.file.buffer).toString("base64");
  const homeItem = new HomeItems({
    _id:itemId.id,
    img:b64,
    barcode:"",
    name:req.body.name
  })
  await homeItem.save()
  res.send(req.body.name);
  itemId.id=itemId.id+1
 
})

app.get('/homeItems', async (req, res) => {
  const homeItems = await HomeItems.find({},{img:1,name:1}) 
  res.send(homeItems);
 
})

app.post('/addCartItem', async (req, res) => {
  console.log(req.body.itemId,req.body.amount,req.body.userId);
  let cartItem = {
    _id:req.body.itemId,
    amount:req.body.amount
  }
  User.findByIdAndUpdate({ _id: req.body.userId},{ $push: { cartItems: cartItem } }).then(user => {
    // user.cartItems.push( cartItem )
    // user.save()
    console.log(user);
  });
  res.status(201).json({
    message: 'cart item added'
  });  
 
})
app.get('/getCartItems', async (req, res) => {
  let id = 1
  const CartItems = await User.find({_id:id},{_id:-1,cartItems:1}) 
  res.send(CartItems);
 
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})