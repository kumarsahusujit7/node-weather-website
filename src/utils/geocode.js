const request = require('request')

const geocode = (address, callback1) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoia3VtYXJzYWh1c3VqaXQ3IiwiYSI6ImNrMXJvMHFqMTA3Ym8zaW8ydWJ0ZjliOHMifQ.DDDeXMFyCGpFCAJJrfCogg"

    // request({url: url, json: true}, (error, response) => {
        //After shorthand notation `url` and Destructuring response object
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback1('Unable to connect to location services', undefined)
        } else if(body.features.length === 0){
            callback1("Unable to find location, try another", undefined)
        } else {
            callback1(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode