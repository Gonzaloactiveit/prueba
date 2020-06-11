'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct) 
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)
api.post('/singup', userCtrl.singUp)
api.post('/singin', userCtrl.singIn)
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso'})
})

module.exports = api