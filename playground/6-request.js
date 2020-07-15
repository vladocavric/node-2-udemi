const http = require('http')
const baseUrl = 'http://api.weatherstack.com/current?access_key='
const api_key = '6e24fd7dbdaf535986011135ac869334'
const metric = '&units=m'
const lat = 45
const lon = -70
const urlString = `${baseUrl}${api_key}&query=${lat},${lon}${metric}`
const url = encodeURI(urlString)

let data =''

const request = http.request(url, (res) => {
    res.on('data', (chank) => {
        data = data + chank.toString()
        console.log(data)
    })

    res.on('end', () => {
        const info = JSON.parse(data)
        console.log(info)
    })
})

request.on('error', (error) => {
    console.log('error', error)
})

request.end()