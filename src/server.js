const express = require('express')
// const multer = require('multer')
// const fileUpload = require('express-fileupload')
// const mongodb = require('mongodb')
// const fs = require('fs')
// const binary = mongodb.Binary

const User = require('./models/users');
const Banner = require('./models/banners');
const homeItems = require('./models/homeItems');

require('./db/mongoose')

const app = express()
const port = process.env.PORT

app.use(express.json())
// app.use(fileUpload())


// app.get("/banners", async (req, res, next) => {
//   try {
//   const data = await User.findById(1);
//   console.log(data);
//   if (!data) {
//     return res.status(404).send()
//   }
//   res.json({
//     message: data,
//   });

//   } catch (error) {
//     res.status(404).send()
    
//   }
  
//   });

//   const upload = multer({
//   // limits:{
//   //   fileSize:2000000
//   // },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//         return cb(new Error('Please upload an image'))
//     }

//     cb(undefined, true)
// }

//   })

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
  const banners = await Banner.find();
    res.send(banners)

})
app.get('/', async (req, res) => {
    res.send('banners')

})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})