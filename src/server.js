const express = require('express')
const multer = require('multer')

const User = require('./models/users');
const Banner = require('./models/banners');
const homeItems = require('./models/homeItems');

require('./db/mongoose')

const app = express()
const port = process.env.PORT

app.use(express.json())



app.get("/banners", async (req, res, next) => {
  try {
  const data = await User.findById(1);
  console.log(data);
  if (!data) {
    return res.status(404).send()
  }
  res.json({
    message: data,
  });

  } catch (error) {
    res.status(404).send()
    
  }
  
  });

  const upload = multer({
  // limits:{
  //   fileSize:2000000
  // },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Please upload an image'))
    }

    cb(undefined, true)
}

  })

app.post('/addBanner', upload.single('upload'), async (req, res) => {
    // const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    console.log(req.file);
    buffer= req.file.buffer
    // req.user.avatar = buffer
    const banner = new Banner({
      _id:3,
      Img:buffer,
      barcode:""
    })
    console.log(banner);
    // await banner.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
res.send({message:"good"})
})

app.get('/banner', async (req, res) => {
  try {
      const banners = await Banner.find();
      console.log({a:banners[0].Img});
      if (!banners) {
          throw new Error()
      }

      // res.set('Content-Type', 'image/png')
      res.status(201).json({
        img: banners[0].Img,
        barcode:banners[0].barcode
      });  
    } catch (e) {
      res.status(404).send()
  }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})