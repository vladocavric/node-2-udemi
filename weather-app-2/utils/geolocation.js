const request = require('postman-request')

const geolocation = (address, cb) => {
    const mapboxToken = process.env.ACCESS_TOKEN
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapboxToken}&limit=1`
    const url = encodeURI(mapboxUrl)

    request({url, json: true}, async (err, {body} = {}) => {
        try {
            if (body.message) {
                cb(`Unable to find the pleace that you are searching for`, undefined)
            } else if (res.body.features.length === 0) {
                cb(`Unable to find the pleace that you are searching for`, undefined)
            } else {
                const data = {
                    lat: body.features[0].center[1],
                    lon: body.features[0].center[0],
                    name: body.features[0].place_name
                }
                cb(undefined, data)
            }
        } catch (e) {
            console.log()
            cb(`Threre is no network at the moment`, undefined)
        }
    })
}

module.exports = geolocation