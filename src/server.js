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
    res.send("Lets..GOOO.!!!")
})

app.get('/variable', (req, res) => {
  res.send(arr)
  arr.a=arr.a+1
  arr.b=arr.b+1
  arr.c=arr.c+1
})

app.post('/addItems',upload.single('avatar'), async (req, res) => {
  console.log(req.body.name);
  let b64 = new Buffer(req.file.buffer).toString("base64");
  const item = new Items({
    _id:itemId.id,
    img:b64,
    name:req.body.name,
    mrp:req.body.mrp,
    rate:req.body.rate

  })
  await item.save()
  res.send(req.body.name);
  itemId.id=itemId.id+1
 
})

app.get('/HomeItems', async (req, res) => {
  const homeItems = await Items.find({},{img:1,name:1}).limit(9) 
  res.send(homeItems);
 
})

app.post('/addCartItem', async (req, res) => {

  console.log(req.body.itemId,req.body.amount,req.body.userId);
  let cartItem = {
    _id:req.body.itemId,
    amount:req.body.amount
  }
  User.findByIdAndUpdate({ _id: req.body.userId},{ $push: { cartItems: cartItem } }).then(user => {
    user.cartItems.push( cartItem )
    console.log(user);
  });
  res.status(201).json({
    message: 'cart item added'
  });  
 
})

app.get('/getCartItems', async (req, res) => {
  let id = req.headers.userID
  // console.log(req.body);
  let itemIds=[]
  const CartItems = await User.find({_id:id},{_id:-1,cartItems:1}).then((user)=>{
    // console.log(user[0].cartItems.length);
    for (let i = 0; i < user[0].cartItems.length; i++) {
      user[0].cartItems[i]._id      
      itemIds.push(user[0].cartItems[i]._id)
    }
    Items.find({_id:itemIds}).then((items)=>{
      toSend=[];
      for (let i = 0; i < items.length; i++) {
        let obj={
          _id:items[i]._id,
          name:items[i].name,
          img :items[i].img,
          mrp :items[i].mrp,
          rate :items[i].rate,
          amount :user[0].cartItems[i].amount,

        }
        toSend.push(obj)
      }
      // console.log(toSend);
      res.send(toSend);

    })

  }) 
  
 
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})