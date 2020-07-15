const geolocation = require('./utils/geolocation')
const forecast = require('./utils/forecast')

const place = process.argv[2]
if (!place) {
    return console.log('please provide location')
}

geolocation(place, (err, {lat, lon, name} = {}) => {
    if (err) {
        console.log(`Error: ${err}`)
    } else {
        console.log(`latitude: ${lat}`)
        console.log(`longitude: ${lon}`)
        console.log(`Place name: ${name}`)
        forecast(lat, lon, (err, forecastData) => {
            if (err) {
                console.log(`Error: ${err}`)
            } else {
                console.log(name)
                console.log(forecastData)
            }
        })
    }
})