const express = require('express')
const User = require('./users');
require('./db/mongoose')

const app = express()
const port = process.env.PORT

app.use(express.json())

app.get("/users", async (req, res, next) => {
  try {
  const data = await User.findById(1);
  if (!data) {
    return res.status(404).send()
  }
  res.json({
    message: "Posts fetched successfully!",
  });
  } catch (error) {
    res.status(404).send()
    
  }
  
 

  });
  app.get("/k", (req, res, next) => {
      res.status(200).json({
        message: "Posts fetched successfully!",
    });
  });

//  one();
//  async function one(){
//     const data = await User.find();
//   if (!data) {
//     return res.status(404).send()
// }
// // res.send(data)
// console.log("data",data);
//   }

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})