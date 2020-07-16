//======================================================================================================================
const express = require('express')
const dbConnection = require('./db/mongoose')
const User = require('./modules/user')
const Task = require('./modules/task')
const app = express()
//======================================================================================================================
const port = process.env.PORT
//======================================================================================================================
app.use(express.json())

//======================================================================================================================

app.get('/users', async (req, res) => {
    res.send('get susers')
})

app.post('/users', async (req, res) => {
    // try {
    //     const user = new User(req.body)
    //     user.save()
    //     res.status(200).send(user)
    // } catch (e) {
    //     res.status(400).send(e)
    // }
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.send(e)
    })
})

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`server radi na portu ${port}`)
})