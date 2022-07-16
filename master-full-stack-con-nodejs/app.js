'use strict'

// Requerimientos
var express = require("express")
var bodyParser = require("body-parser")

// Cargar Express
var app = express()

// cargar archivos de rutas.
var userRoutes = require("./routers/userRoute")
var topicRoutes = require("./routers/topicRoutes")


/* Middlewears
 Confifuracion para que boyoparser funcione bien */ 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS 

// reescribir rutas 
app.use('/api', userRoutes)
app.use('/api', topicRoutes)

/* Exportar el modulo app  */
module.exports = app