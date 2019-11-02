const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = "https://api.darksky.net/forecast/bad6aa4b02802a770ba4ab6c1a56e284/" + longitude +","+latitude
    // request({url: url, json: true}, (error, response) => {
    //After shorthand notation `url` and Destructuring response object
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services', undefined)
        } else if(body.error){
            callback("Unable to find location, try another", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain")
        }
    })
}

module.exports = forecast