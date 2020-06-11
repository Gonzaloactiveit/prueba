'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../service')
const user = require('../models/user')

function singUp(req, res){

const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
    
})


    user.save((err)=>{
        if(err) res.status(500).send({message: `Error al crear el usuario`})

        return res.status(200).send({token: service.createToken(user)})
    })
}


function singIn(){
    user.find({ email: req.body.email}, (err,user) => {
        if (err) return res.status(500).send({message: err})
        if(!user) return res.status(404).send({message: 'No existe el usuario'})

        req.user = user
        res.status(200).send({
            message: 'Te has logeado correctamente',
            token: service.createToken(user)

        })
    })
    
}

module.exports = {
    singUp,
    singIn

}