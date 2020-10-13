const express = require('express')
const multer = require('multer')
const bodyParser = require("body-parser");

const User = require('./models/users');
const Banner = require('./models/banners');
const HomeItems = require('./models/homeItems');
const Items = require('./models/items')
const Userslength = require ('./models/userslength')
 
// var allBanners;
const allBanners =  Banner.find();

require('./db/mongoose')
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = express()
const port = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var lumos = 5;
var bannerId = {id:4} ;
var itemId   = {id:7};
var arr = {a:0,b:1,c:2}


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

app.get('/getItems', async (req, res) => {
  const items = await Items.find()
  res.send(items);
 
})

app.post('/addCartItem',  (req, res) => {
  let type = req.body.type
  if (type=="u") {
    type="$push"
  } else {
    type="$set"
  }
  User.findByIdAndUpdate({ _id: req.body.userId},{ [type]: { cartItems: req.body.items } }).then(user => {
    console.log("user`s cart items updated",user);
  });
  res.status(201).json({
    message: 'cart item added'
  });  
 
})

app.get('/getCartItems', async (req, res) => {
  let id = req.headers.userid
  // console.log(req.headers.userid);
  // console.log(req.header);
  let itemIds=[]
  const CartItems = await User.find({_id:id},{_id:0,cartItems:1}).then((user)=>{
    // console.log(user[0].cartItems.length);
    for (let i = 0; i < user[0].cartItems.length; i++) {
      // user[0].cartItems[i]._id      
      itemIds.push(user[0].cartItems[i]._id)
    }
    Items.find({_id:itemIds}).then((items)=>{
      toSend=[];
      console.log(items[0].name);
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

app.get('/checkUser', async (req, res) => {

 let key ;
 let val ;
  if (req.headers.email != undefined  ) {
    console.log("1");
    key  = "email";
    val = req.headers.email;
  }
  else if(req.headers.phone != undefined  ){
    console.log("2");
    key  = "phone";
    val = String(req.headers.phone);
    console.log(typeof val);

  }
  console.log("val", val);
  User.findOne({ [key]: [val]}).then(async (user) => {
    if (user != null) {
      res.status(201).json({
        user: user
      }); 
    }
    else{
      let newid=-1;
       await Userslength.findOne({_id:0}).then((document)=>{
        newid= document.toObject().ID
        res.status(201).json({
          user: {
            _id:newid,
            firstName:''
          }
        }); 
      })
      const user = new User({
        _id:newid,
      })
      console.log(user);
      user.save();
      Userslength.updateOne( {_id:0} ,{$inc:{ID:1}},{upsert:true}).then((doc)=>{
        console.log(doc);
        console.log("inc done")
      });
      

    }
  });

})

app.post('/addUserData', async (req, res) => {
console.log(req.body);
  User.findOneAndUpdate({_id:req.headers.userid},{$set:req.body}).then((user)=>{
    // console.log("user Updated",user);
    res.status(201).json({
      user: user
    }); 
  })

})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})