const request = require("request")

const weather_access_key = '20a26b7808a5b7aacd9e93f848ce96d0'
const units = 'm'

const forecast = (latitude, longitude, callback) => {
    const query = `${latitude},${longitude}`
    const url = `http://api.weatherstack.com/current?access_key=${weather_access_key}&query=${query}&units=${units}`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to a Network', undefined)
        }
        else if (body.error) {
            callback('Unable to Get Weather Data', undefined)
        }
        else {
            const data = {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions[0]
            }
            callback(undefined, data)
        }

    })
}

module.exports = forecast