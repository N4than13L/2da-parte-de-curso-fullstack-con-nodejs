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

// para listar todos los datos del usuario pero sin la contrasena
UserSchema.methods.toJSON = function(){
    // mediante la variable o instacia de la funcion 
    // el cual no nos va a mostrar en en el metodo populate.
    var obj = this.toObject()
    delete obj.password

    return obj
}

/* exportar el modelo de datos tambien  */
module.exports = mongoose.model("User", UserSchema)
                               /* el escribir User se convertirá en minuscula (lowercase) 
                               en la db y lo va a pluralizar
                               a users -> documentos (schema)  */  