const request = require('postman-request')

const forecast = (lat, lon, cb) => {
    const baseUrl = 'http://api.weatherstack.com/current?access_key='
    const api_key = process.env.API_KEY
    const metric = '&units=m'
    const urlString = `${baseUrl}${api_key}&query=${lat},${lon}${metric}`
    const url = encodeURI(urlString)

    request({url, json: true}, async (err, {body} = {}) => {
        try {
            if (!body) {
                cb('Something went wrong please try again', undefined)
            } else if (!body.current) {
                cb(body.error.info, undefined)
            } else {
                cb(undefined, body)
            }
        } catch (e) {
            cb(`Threre is no network at the moment (forcast)`, undefined)
        }
    })
}

// forecast(19.9333, 45.2, (err, forecastData) => {
//     if (err) {
//         console.log(`Error: ${err}`)
//     } else {
//         console.log(forecastData.current)
//         // console.log(forecastData.location.name)
//         // console.log(forecastData.current.temperature)
//         console.log(forecastData.current.weather_descriptions[0])
//         // console.log(forecastData.current.weather_description[0])
//         // console.log(`${forecastData.current.weather_description[0]}. In ${data.name} curent temperature is ${forecastData.current.temperature} and it feeles like ${forecastData.current.feelslike}`)
//     }
// })


module.exports = forecast