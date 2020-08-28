const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://damon:qwert123@cluster0.qyevd.mongodb.net/eGrocery?retryWrites=true', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
console.log(process.env.MONGODB_URL);