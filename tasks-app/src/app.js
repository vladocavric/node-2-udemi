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

//   app.use((req, res, next) => {
//       console.log(req.method)
//       console.log(req.path)
//       if (req.method === 'POST') {
//           return res.status(503).send('ne moze ovo')
//       }
//
//       next()
//   })

// app.use((req, res, next) => {
//     res.status(503).send('odrzavanje')
//     console.log(req.method)
//     console.log(req.path)
//     next()
// })

app.use(express.json())
app.use('/users', userRouter)
app.use('/tasks', taskRouter)

module.exports = app
