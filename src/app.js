const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

//Define path for Express config
const publicPath = path.join(__dirname,'../public')
//default directory for hbs views is {directory}/views, we can customize by setting any other derectory
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(__dirname)
// console.log(__filename)

//set up handle bars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicPath))

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express</h1>')
// })

// app.get('/help', (req, res) => {    
//     res.send([{
//         name: 'Sujit'
//     }, {
//         name: 'Kumar'
//     }])
// })

// app.get('/about', (req, res) => {    
//     res.send('<h1>About Page</h1>')
// })

// app.get('/weather', (req, res) => {    
//     res.send({
//         location: 'Singapore',
//         forecast: 'its 20 degree'
//     })
// })

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Sujit'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Sujit'
    })
})

app.get('/help', (req, res) => {    
    res.render('help',{
        title: 'Help',
        helpText: 'Some helpful text',
        name: 'Sujit'
    })
})

// app.get('/help/*', (req, res) => {    
//     res.send('Help article not found')
// })

// app.get('*', (req, res) => {    
//     res.send('My 404 page')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecast_data) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecast_data,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {    
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Sujit'
    })
})

app.get('*', (req, res) => {    
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Sujit'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})