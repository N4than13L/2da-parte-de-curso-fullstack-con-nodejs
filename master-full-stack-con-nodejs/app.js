'use strict'

// Requerimientos
var express = require("express")
var bodyParser = require("body-parser")

// Cargar Express
var app = express()

// cargar archivos de rutas.
var userRoutes = require("./routers/userRoute")
var topicRoutes = require("./routers/topicRoutes")
var comentRoute = require("./routers/comentRoute")

/* Middlewears
 Confifuracion para que boyoparser funcione bien */ 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// reescribir rutas 
app.use('/api', userRoutes)
app.use('/api', topicRoutes)
app.use('/api', comentRoute)
/* Exportar el modulo app  */
module.exports = app