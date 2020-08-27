const express = require('express')
const User = require('./users');
require('./db/mongoose')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.get("/users", (req, res, next) => {
    console.log("s");
    User.find().then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        lastIdUsed: documents
      });
      console.log(documents);
    });
  });
//  one();
//   function one(){
//     User.find().then(documents => {
        
//         console.log(documents);
//       });
//   }

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})