'use strict'

var secret = 'clave_secreta'
var jwt = require('jwt-simple')
var moment = require('moment')

exports.authenticated = function (req, res, next){
    // comprobar si llega la auth
    if(!req.headers.authorization){
        return res.status(403).send({
            message: "la peticion no tiene la cabezera de autorizacion"
        })
    }

    // limpiar el token y quitar comillas
    var token = req.headers.authorization.replace(/['"]+/g, '')

    try {
        // decodificar token 
        var payload = jwt.decode(token, secret)
        
        // comprovar si el token se vencio
        if (payload.ex <= moment().unix()){
            return res.status(404).send({
                message: "token se ha vencido"
            })  
        }
        
    } catch (ex) {
        return res.status(404).send({
            message: "token no valido"
        }) 
    }
    
    // adjuntar usuario identificadp a request
    req.user = payload
    
    // pasar a la accion 
    next()
}