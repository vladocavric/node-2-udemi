const {addUser, removeUser, getUser, getUsersInRoom} = require(`./users`)
const rooms = []

const addRoom = (room) => {
    console.log(rooms)
    room = room.trim().toLocaleLowerCase()

    const existingRoom = rooms.find((roomFromArray) => {
        return roomFromArray === room
    })
    console.log(rooms)

    if (!existingRoom) {
       rooms.push(room)
    }
    console.log(rooms)
    return rooms
}


const removeRoom = (room) => {
    console.log(rooms)
    const noOfUsersInRoom = getUsersInRoom(room).length
    if (noOfUsersInRoom > 0) {
        return room
    }
    const index = rooms.findIndex((roomFromArray) => roomFromArray === room)
    if (index !== -1) {
        return rooms.splice(index, 1)[0]
    }
}




module.exports = {
    addRoom,
    removeRoom,
    rooms
}