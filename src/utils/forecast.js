const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fd5a7d403168500f9cd3eff57170d7a9&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, {body}) =>{
        if(error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location.')            
        } else {
            const forecast = body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out and it feels like " + body.current.feelslike + ' degrees out.'
            const wind_speed = 'The wind speed is ' + body.current.wind_speed + '.'
            callback(undefined, {forecast, wind_speed})
        }
    })
}

module.exports = forecast