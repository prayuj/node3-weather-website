const request = require("request")

const mapbox_access_token = 'pk.eyJ1IjoicHJheXVqIiwiYSI6ImNrZXM3bGRvajJ3emMyeXBpMDZkdms4djEifQ.SI80j0W_82P0rIWXxfDuaA'
const limit = 1

geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapbox_access_token}&limit=${limit}`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to a Network', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to Find Location, Try another search', undefined)
        }
        else {
            const data = {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            }

            callback(undefined, data)
        }
    })
}

module.exports = geocode