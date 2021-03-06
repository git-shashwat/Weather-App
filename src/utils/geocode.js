const request = require('request')

const geoCode = (address, callback) => {
    const url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicnhzaGFzaHdhdCIsImEiOiJjazBkbGNidHAwMTExM25rZnJpamdsNDF6In0.gw4VuFWLXxk6kdY_zxTPgw&limit=1`

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                lattitude: body.features[0].center[1],
                location: body.features[0].place_name,
            })
        }
    })
}

const revGeoCode = (longitude, latitude, callback) => {
    const url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoicnhzaGFzaHdhdCIsImEiOiJjazBkbGNidHAwMTExM25rZnJpamdsNDF6In0.gw4VuFWLXxk6kdY_zxTPgw&limit=1`;

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try Another.', undefined);
        } else {
            callback(undefined, body.features[0].place_name);
        }
    })
}

module.exports = {
    geoCode,
    revGeoCode
}