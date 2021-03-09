const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Prayuj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Prayuj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: 'Prayuj'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (err, { temperature, feelslike }) => {
            if (err) {
                return res.send({
                    error: err
                })
            }
            else {
                return res.send({
                    location,
                    temperature,
                    feelslike,
                    address
                })
            }
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'Provide search time'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prayuj',
        errorMessage: 'Help Page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prayuj',
        errorMessage: 'Page not found'
    });
})

app.listen(port, () => {
    console.log('Server is up on port', port)
})