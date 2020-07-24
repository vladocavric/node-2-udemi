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


//======================================================================================================================
app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`server radi na portu ${port}`)
})

  // const myFunction = async () => {
  //   // const task = await Task.findById('5f1aea478d8aa061740a2394')
  //   //   await task.populate('author').execPopulate()
  //   //   console.log(task.author)
  //     const user = await User.findById('5f1ae28ec4276559a5e4a35c')
  //     await user.populate('tasks').execPopulate()
  //     console.log(user.tasks)
  //
  // }
  //
  //
  // myFunction()