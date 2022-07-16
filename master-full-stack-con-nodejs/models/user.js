'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    image: String,
    role: String
})

/* exportar el modelo de datos tambien  */
module.exports = mongoose.model("User", UserSchema)
                               /* el escribir User se convertirá en minuscula (lowercase) 
                               en la db y lo va a pluralizar
                               a users -> documentos (schema)  */  