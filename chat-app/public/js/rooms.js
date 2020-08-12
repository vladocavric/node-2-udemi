const socket = io()

const $selectActiveRoom = document.getElementById('selectActiveRoom')


const selectTemplate = document.getElementById('selectTemplate').innerHTML



socket.on(`rooms`, (rooms) => {
    if (rooms.length > 0) {
        const html = Mustache.render(selectTemplate, {
            rooms
        })
        $selectActiveRoom.innerHTML = html
    }
})

const a = async () => {
    const $roomsSelect = document.getElementById('roomsSelect')
    console.log($roomsSelect)
}
a()

//
// // if ($roomsSelect) {
// await $selectActiveRoom.addEventListener('change', () => {
//     console.log($roomsSelect.value)
// })
// // }

