const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/eGrocery', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
console.log(process.env.MONGODB_URL);