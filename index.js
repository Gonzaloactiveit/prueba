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
    Product.find({}, (err,products) =>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        if(!products) return res.status(404).send({message: `No existen productos`})

        res.send(200, {products: products})
    })
})

app.get('/api/product/:productId',(req,res) =>{
    let productId = req.params.productId

    Product.findById(productId, (err,product) => {
        if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        if(!product) return res.status(404).send({message: `El producto no existe`})

        res.status(200).send({product: product})
    })
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
    let productId = req.params.productId
    let update = req.body
    
    Product.findByIdAndUpdate(productId, update, (err, productUpdated) =>{
        if(err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})

        res.status(200).send({ product: productUpdated})
    })

})

app.delete('/api/product/:productId', (req,res) => {
    let productId = req.params.productId

    Product.findById(productId, (err,product) =>{
        if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})

        product.remove( err =>{
            if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
            res.status(200).send({message: 'El producto ha sido eliminado'})
        })

    })

})

mongoose.connect('mongodb+srv://gibarra:Glassgon1292@cluster0-agvp6.mongodb.net/shop?retryWrites=true&w=majority', (err,res) =>{
    if (err) throw err
    console.log('Conexion a la base de datos establecido...')

    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`)
    })
})
