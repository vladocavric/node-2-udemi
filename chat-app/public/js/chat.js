const socket = io()

// Elements
const $form = document.getElementById('messageForm')
const $messageField = document.getElementById('messageText')
const $sendLocation = document.getElementById('sendLocation')
const $formSubmit = document.getElementById('formSubmit')
const $messages = document.getElementById('messages')

// Templates
const messageTemplate = document.getElementById('messageTemplate').innerHTML
const locationTemplate = document.getElementById('locationTemplate').innerHTML
const myMessageTemplate = document.getElementById('myMessageTemplate').innerHTML
const myLocationTemplate = document.getElementById('myLocationTemplate').innerHTML


// generate message with time

const generateMessage = (text) => {
    return {
        text,
        createdAt: moment(new Date().getTime()).format(`h:mm a`)
    }
}


$sendLocation.addEventListener(`click`, () => {
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported by this browser.")
    }
    $sendLocation.disabled = true
    navigator.geolocation.getCurrentPosition((position) => {
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        socket.emit('sendLocation', location, () => {
            $sendLocation.disabled = false
            const myLocation = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
            const createdAt = new Date().getTime()
            const html = Mustache.render(myLocationTemplate, {
                myLocation,
                createdAt: moment(createdAt).format(`h:mm a`)
            })
            $messages.insertAdjacentHTML('beforeend', html)
        })
    })
})


$form.addEventListener('submit', (e) => {
    e.preventDefault()
    $formSubmit.disabled = true
    // $formSubmit.setAttribute(`disabled`, ``)
    const messageText = $messageField.value
    const createdAt = new Date().getTime()

    if (messageText === ``) {
        $formSubmit.disabled = false

        return console.log(`Please right something`)
    }
    socket.emit('sendMessage', messageText, (profanity) => {
        $formSubmit.disabled = false
        $messageField.value = ''
        $messageField.focus()
        if (profanity) {
            return console.log(profanity)
        }
        console.log(`message delivered`)

        const html = Mustache.render(myMessageTemplate, {
            messageText,
            createdAt: moment(createdAt).format(`h:mm a`)
        })
        $messages.insertAdjacentHTML('beforeend', html)

    })

})

// socket.on(`receiveMessage`, (message) => {
//     console.log(message)
//
// })

socket.on(`message`, (message) => {

    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format(`h:mm a`)
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on(`locationMessage`, (location) => {
    const html = Mustache.render(locationTemplate, {
        location: location.text,
        createdAt: moment(location.createdAt).format(`h:mm a`)
    })
    $messages.insertAdjacentHTML('beforeend', html)
})