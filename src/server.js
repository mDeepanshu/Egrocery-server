const express = require('express')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.get("/users", (req, res, next) => {
    users.find().then(documents => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        lastIdUsed: documents
      });
    });
  });
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})