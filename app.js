'use strict'

const express = require('express')
const bodyparser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()
const api = require('./routes')

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))

app.set('view engine', '.hbs')



app.use('/api', api)
app.get('/login', (req,res) =>{
    res.render('login')
})

module.exports = app