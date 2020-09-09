const express = require('express')
const multer = require('multer')
// const fileUpload = require('express-fileupload')
// const mongodb = require('mongodb')
// const fs = require('fs')
// const binary = mongodb.Binary

const User = require('./models/users');
const Banner = require('./models/banners');
const HomeItems = require('./models/homeItems');
const Items = require('./models/Items');

 
// var allBanners;
const allBanners =  Banner.find();

require('./db/mongoose')

const app = express()
const port = process.env.PORT

var lumos = 5;
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
    _id:10,
    img:b64,
    barcode:""
  })
  await banner.save()
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
  console.log(req.files);
  // let b64 = new Buffer(req.files.uploadedFile.data).toString("base64");
  const homeItem = new HomeItems({
    _id:1,
    img:'b64',
    barcode:""
  })
  // await homeItem.save()
  res.send(homeItem);
 
})

app.get('/homeItems', async (req, res) => {
  const homeItems = await HomeItems.find({},{img:1,name:1}) 
  res.send(homeItems);
 
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})