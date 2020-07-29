const mongoose = require('mongoose')

//======================================================================================================================
const url = process.env.DB
mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})