const $weatherForm = document.getElementById('weatherForm')
const $searchInput = document.getElementById('searchInput')
const $messageOne = document.getElementById('message-1')
const $messageTwo = document.getElementById('message-2')
const $myWeather = document.getElementById('myWeather')

$weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchValue = $searchInput.value
    const urlLocation = encodeURI(searchValue)
    $messageOne.textContent = 'loading...'
    $messageTwo.textContent = ''
    const url = `/weather?address=${urlLocation}`
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // return console.log(data.error)
                return $messageOne.textContent = data.error
            }
            $messageOne.textContent = data.location
            $messageTwo.textContent = data.temperature
            // console.log(data.location)
            // console.log(data.temperature)
        })
    })
})

$myWeather.addEventListener('click', () => {
    $messageOne.textContent = 'loading...'
    $messageTwo.textContent = ''
    getLocation()
})
function getLocation() {

    if (!navigator.geolocation) {
        return alert("Geolocation is not supported by this browser.")

    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude)
            const url = `weatherformylocatio?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            console.log(url)
            fetch(url).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        return $messageOne.textContent = data.error
                    }
                    $messageOne.textContent = data.location
                    $messageTwo.textContent = data.temperature

                })
            })
        });
    }
}


