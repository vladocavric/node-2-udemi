const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geolocation = require('../utils/geolocation')
const forecast = require('../utils/forecast')


const publicFolderPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


app.use(express.static(publicFolderPath))

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('/', (req, res) => {
    res.render('index', {title: 'Wetather Page', author: 'Vlado Cavric'})
})


app.get('/help', (req, res) => {
    res.render('help', {title: 'Help Page', author: 'Vlado Cavric'})
})

app.get('/help/*', (req, res) => {
    res.render('404', {message: 'help article not found'})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Page', author: 'Vlado Cavric'})
})

app.get('/weather', async (req, res) => {

    try {
        if (!req.query.address) {
            throw new Error()
        }
        geolocation(req.query.address, (err, {lat, lon, name} = {}) => {
            if (err) {
                return res.send({error: err})
            } else {
                forecast(lat, lon, (err, forecastData) => {
                    if (err) {
                        return res.send({error: err})
                    } else {
                        return res.send({
                            addressFromUrl: req.query.address,
                            mapbox_location: name,
                            location: forecastData.location.name,
                            weather_description: forecastData.current.weather_descriptions[0],
                            temperature: forecastData.current.temperature,
                            feels_like: forecastData.current.feelsLike,
                            visibility: forecastData.current.visibility,
                            is_day: forecastData.current.is_day,
                            wind_speed: forecastData.current.wind_speed
                        })
                    }
                })
            }
        })

    } catch (e) {
        res.send({error: 'please provide an addrese'})
    }
})

app.get('/weatherformylocatio', async (req, res) => {
    try {
        if (!req.query.lat || !req.query.lon) {
            throw new Error()
        }
        forecast(req.query.lat, req.query.lon, (err, forecastData) => {
            if (err) {
                return res.send({error: err})
            } else {
                return res.send({
                    lat: req.query.lat,
                    lon: req.query.lon,
                    location: forecastData.location.name,
                    weather_description: forecastData.current.weather_descriptions[0],
                    temperature: forecastData.current.temperature,
                    feels_like: forecastData.current.feelsLike,
                    visibility: forecastData.current.visibility,
                    is_day: forecastData.current.is_day,
                    wind_speed: forecastData.current.wind_speed
                })
            }
        })
    } catch (e) {
        res.send({error: 'please provide an latitude and longitude'})
    }
})

app.get('/products', async (req, res) => {
    try {
        if (!req.query.search) {
            throw new Error()
        }
        console.log(req.query)
        res.send({products: []})
    } catch (e) {
        res.send({error: 'you must provide an search term'})
    }

})

app.get('*', (req, res) => {
    res.render('404', {message: 'Page not found'})
})

app.listen(3000, () => {
    console.log('this is working')
})