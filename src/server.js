const express = require('express')
// const multer = require('multer')
// const fileUpload = require('express-fileupload')
// const mongodb = require('mongodb')
// const fs = require('fs')
// const binary = mongodb.Binary

const User = require('./models/users');
const Banner = require('./models/banners');
const homeItems = require('./models/homeItems');
 
let allBanners;

require('./db/mongoose')

const app = express()
const port = process.env.PORT

app.use(express.json())
// app.use(fileUpload())
async function onStart(){
  const banners = await Banner.find();
  this.allBanners = banners
}

app.post("/addBanner", async(req, res) => {
  let b64 = new Buffer(req.files.uploadedFile.data).toString("base64");
  const banner = new Banner({
    _id:1,
    img:b64,
    barcode:""
  })
  await banner.save()
  res.send("good")

})

app.get('/getBanner', async (req, res) => {
  // const banners = await Banner.find();
    res.send(this.allBanners)

})
app.get('/', async (req, res) => {
    res.send('banners')

})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})