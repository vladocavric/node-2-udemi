const path = require(`path`)
const http = require(`http`)
const express = require(`express`)
const socketio = require(`socket.io`)
const Filter = require('bad-words')
const {generateMessage} = require('./utils/messages')


const app = express()
const server = http.createServer(app)
const io = socketio(server)
//======================================================================================================================
const publicFolderPath = path.join(__dirname, `../public`)
const viewsFolderPath = path.join(__dirname, `./views`)
app.use(express.static(publicFolderPath))
app.set('views', viewsFolderPath)
app.set('view engine', 'ejs');
//======================================================================================================================

io.on(`connection`, (socket) => {
    console.log(`new connection`)
    socket.emit(`message`, generateMessage(`Welcome to the chat app`))
    socket.broadcast.emit('message', generateMessage(`New user has joind`))
    socket.on('sendMessage', (message, cb) => {
        const filter = new Filter(message)
        if (filter.isProfane(message)) {
            return cb(`Profanity is not allowed`)
        }
        socket.broadcast.emit('message', generateMessage(message))
        cb()
    })
    socket.on('disconnect', () => {
        io.emit(`message`, generateMessage(`Some user has left`))
    })
    socket.on('sendLocation', (location, cb) => {
        socket.broadcast.emit('locationMessage', generateMessage(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`))
        cb()
    })
})
//======================================================================================================================
app.get('/chat', (req, res) => {
    res.render('chat')
})
//======================================================================================================================
const port = process.env.PORT
server.listen(port, () =>{
    console.log(`ovo radi na portu ${port}` )
})