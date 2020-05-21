const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Joe Belmonte'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Joe Belmonte'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'Here is where you can get help.',
        name: 'Joe Belmonte'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address){
        return res.send({
            error: "You must provide an address."
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {} ) => {
        if(error){
            return res.send({
                error        
            })
        }
        forecast(longitude, latitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error        
                })
            }
            res.send({
                forecast: forecastdata.forecast,
                location: location,
                address: req.query.address,
                wind_speed: forecastdata.wind_speed        
            })
        })
    })
})

app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Help Page Not Found',
        errorText: 'Help article not found.',
        name: 'Joe Belmonte'
        })
    }
)

app.get('*', (req, res) => {
    res.render('404page', {
        title: 'Page Not Found',
        errorText: 'Page not found.',
        name: 'Joe Belmonte'
        })
})

app.listen(port, ()=>{
    console.log('Server is up on port ', port)
})