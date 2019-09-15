const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/087182adf96b5c8a4449f18d8a88de91/${lattitude},${longitude}?units=si`
    request({url, json: true}, (error, { body }) => {
        if (error){
            callback('Cannot connect to forecast service!', undefined)
        } else if(body.error){
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                forecast: `${body.daily.data[0].summary} Maximum Temperature: ${body.daily.data[0].temperatureHigh} degrees, Minimum Temperature: ${body.daily.data[0].temperatureLow} degrees. There is a ${body.currently.precipProbability*100}% chance of rain.`,
            })
        }
    })
}

module.exports = forecast