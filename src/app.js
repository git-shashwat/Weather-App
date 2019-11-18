const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geoCode, revGeoCode } = require('./utils/geocode')
const forecast = require('./utils/forecast')
const log = console.log;

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shashwat',
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        name: 'Shashwat',
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: "This is a help message.",
        title: 'Help',
        name: 'Shashwat',
    })
})

app.get('/weather', (req, res) => {
    if (req.query.longitude && req.query.lattitude) {
        forecast(req.query.lattitude, req.query.longitude, (error, { forecast } = {}) => {
            if (error) {
                return res.send({
                    error: error,
                }) 
            }
            revGeoCode(req.query.longitude, req.query.lattitude, (error, location) => {
                if (error) {
                    return res.send({
                        error: error,
                    })
                }
                res.send({
                    forecast: forecast,
                    location: location,
                })    
            })     
        })
    }
    else if (req.query.address) {
        geoCode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
            if (error) {
                return res.send({
                    error: error,
                })
            }
            forecast(lattitude,longitude, (error, { forecast } = {}) => {
                if (error) {
                    return res.send({
                        error: error,
                    }) 
                }
                res.send({
                    forecast: forecast,
                    location: location,
                })
            })
        })
    } else {
        res.send({ error: 'Provide a location to search for!' })
    }
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        errorMsg: 'Help article not found.',
        name: 'Shashwat',
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        errorMsg: 'Page not found.',
        name: 'Shashwat'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})