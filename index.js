'use strict'

const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product.js')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.get('/api/product', (req,res) =>{
    res.send(200, {products: []})

})

app.get('/api/product/:productId',(req,res) =>{


})

app.post('/api/product', (req,res) => {
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category =req.body.category
    product.description = req.body.description;
    
    product.save((err, productStored) =>{
        if(err) res.status(500).send({message: `Error al salvar la base de datos: ${err}`})

        res.status(200).send({product: productStored})
    })
})

app.put('/api/product/:productId', (req,res) => {


})

app.delete('/api/product/:productId', (req,res) => {


})

mongoose.connect('mongodb+srv://gibarra:Glassgon1292@cluster0-agvp6.mongodb.net/shop?retryWrites=true&w=majority', (err,res) =>{
    if (err) throw err
    console.log('Conexion a la base de datos establecido...')

    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`)
    })
})
