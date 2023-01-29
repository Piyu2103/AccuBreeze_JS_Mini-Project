const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicGl5dXNoc2luZ2hhbDIxIiwiYSI6ImNrbTV6MTBjcTBqNm8ybmp5ZWd4aHVhcjIifQ.4ui953CRlA6_X_lfyheoDQ&limit=1'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to find the servers', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Invalid Location, enter a valid location', undefined)
        }
        else {
            callback(undefined, {
                Latitude: response.body.features[0].center[1],
                Longitude: response.body.features[0].center[0],
                Location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode