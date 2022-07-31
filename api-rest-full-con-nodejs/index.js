'use strict'

// coneccion al servidor

var mongoose = require("mongoose")
var app = require("./app")
var port = process.env.PORT || 3999

mongoose.Promise = global.Promise

/* Url con la base de datos. 
 
 Con parametro
 usenewurlparser para que la coneccion se realize de mejor manera y mas funcionalidades.
 y promesa .then(con callback) y debajo un .catch() para comprobar errores 
 
 */

mongoose.connect('mongodb://localhost:27017/api_rest_node', {useNewUrlParser: true})
.then( () =>{
    console.log("coneccion a la base de datos de mongo se ha realizado ")
    // Crear el servidor.
    app.listen(port, () =>{
        console.log("El servidor http//localhost:3999")
    })
})
.catch(error =>{
    console.log(error)
})