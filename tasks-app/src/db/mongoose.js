const mongoose = require('mongoose')

//======================================================================================================================
const url = 'mongodb://127.0.0.1:27017/task-app-api'

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})