const path = require('path')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const express = require('express')

const hbs = require('hbs')

const app = express()
const publicdirpath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(publicdirpath))


app.get('',(req, res) =>{
    res.render('index', {
        title: 'Forecast App',
        name: 'PRINCE'
    })
})


app.get('/about',(req, res) =>{
    res.render('about', {
        title: 'ABOUT',
        name: 'PRINCE'
    })
})
app.get('/help',(req, res) =>{
    res.render('help', {
        title: 'HELP',
        name: 'PRINCE'
    })
})

app.get('/weather',(req, res) =>{
    if (!req.query.address){
        return res.send({
            error: 'Please Provide An Address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        weather(latitude, longitude, (error, wdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                weather: wdata,
                location,
                address: req.query.address
            })
        })
    })


})


app.get('/products',(req, res) =>{
    if (!req.query.search){
       return res.send({
            error: 'give a term'
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: 404,
        name: 'PRINCE',
        errorpage: 'Not Help Article'
    })

})

app.get('*', (req, res)=>{
    res.render('error', {
        title: 404,
        name: 'PRINCE',
        errorpage: 'Not Found'
    })

})

app.listen(3000, () =>{
    console.log('Server is up!')
})
