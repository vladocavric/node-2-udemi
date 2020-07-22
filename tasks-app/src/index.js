//======================================================================================================================
const express = require('express')
const jwt = require('jsonwebtoken')
const dbConnection = require('./db/mongoose')
const User = require('./modules/user')
const Task = require('./modules/task')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
//======================================================================================================================
const app = express()
//======================================================================================================================
const port = process.env.PORT
//======================================================================================================================
app.use(express.json())
app.use('/users', userRouter)
app.use('/tasks', taskRouter)
//======================================================================================================================
app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`server radi na portu ${port}`)
})



// const myApp = async () => {
//     const token = jwt.sign({ _id: 'nesto'}, 'doingthecoursefor2ndtime', {expiresIn: '2 days'})
//     console.log(token)
//
//     const data = jwt.verify(token, 'doingthecoursefor2ndtime')
//     console.log(data)
// }
//
// myApp()

