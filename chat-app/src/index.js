const path = require(`path`)
const http = require(`http`)
const express = require(`express`)
const socketio = require(`socket.io`)
const Filter = require('bad-words')
const {generateMessage} = require('./utils/messages')
const {addUser, removeUser, getUser, getUsersInRoom} = require(`./utils/users`)
const {addRoom, removeRoom, rooms} = require(`./utils/rooms`)


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
    socket.emit(`rooms`, rooms)
    console.log(`new connection`)
    socket.on('join', ({username, room}, cb) => {
        const {error, user} = addUser({
            id: socket.id,
            username,
            room
        })

        const rooms = addRoom(room)
        console.log(rooms)

        if (error) {
            return cb(error)
        }
        socket.join(user.room)
        socket.emit(`message`, generateMessage(`${username} welcome to the ${room} room`, `Admin`))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${username} has joind the room`, `Admin`))
        io.to(user.room).emit(`roomData`, {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        cb
    })
    socket.on('sendMessage', (message, cb) => {
        const user = getUser(socket.id)
        // const filter = new Filter(message)
        // if (filter.isProfane(message)) {
        //     return cb(`Profanity is not allowed`)
        // }
        socket.broadcast.to(user.room).emit('message', generateMessage(message, user.username))
        cb()
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit(`message`, generateMessage( `${user.username} has left`, `Admin`))
            io.to(user.room).emit(`roomData`, {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
            const rooms = removeRoom(user.room)
            console.log(rooms)
        }


    })
    socket.on('sendLocation', (location, cb) => {
        const user = getUser(socket.id)
        if (user) {
            socket.broadcast.to(user.room).emit('locationMessage',
                generateMessage(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, user.username))
        }
        cb()
    })
})
//======================================================================================================================
app.get('/chat', (req, res) => {
    res.render('chat')
})
//======================================================================================================================
const port = process.env.PORT
server.listen(port, () => {
    console.log(`ovo radi na portu ${port}`)
})