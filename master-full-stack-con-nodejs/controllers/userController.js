'use strict'

var validator = require("validator")
var User = require("../models/user")
var bcrypt = require("bcrypt-node")
var jwt = require("../services/jwt")
var path = require("path")
var fs = require("fs")

var userController = {
    probando: function(req, res){
        return res.status(200).send({
            message: "metodo probando"
        })
    },

    save: function(req, res){
        // Recojer los parametros de la peticion.
        var params = req.body

        try {
            // Validar los datos.
            var validate_name = !validator.isEmpty(params.name)
            var validate_surname = !validator.isEmpty(params.surname)
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email)
            var validate_password = !validator.isEmpty(params.password)
            
            //console.log(validate_name, validate_surname, validate_email, validate_password)
        
        } catch (error) {
            return res.status(500).send({
                message: "error faltan datos por enviar"
            })
        }
        

        if (validate_name && validate_surname && validate_email && validate_password){
            // Crear objetos de usuario.

            var user = new User()
            // Asignar valores al usuario.

            user.name = params.name
            user.surname = params.surname
            user.email = params.email.toLowerCase()
            user.password = params.password
            user.role = 'ROLE_USER'
            user.image = null
            user.password = params.password

            // Conprobar si existe el usuario.
            User.findOne({email: user.email}, (err, issetUser) => {
                if(err){
                    return res.status(500).send({
                        message: "Error a comprobar duplicidad del usuario"
                    })
                }

                if(!issetUser){
                    // Si no existe 

                    // Cifrar la contrasena 
                    bcrypt.hash(params.password,null, null, (err, hash)=>{
                        user.password = hash

                         // Guardar el usuario 
                        user.save((err, userStored) =>{
                            if(err){
                                return res.status(500).send({
                                    message: "Error al guardar el usuario"
                                })
                            }

                            if(!userStored){
                                return res.status(400).send({
                                    message: "El usuario no se ha guardado"
                                })
                            }
                        })

                        // Devolver una respuesta
                        return res.status(200).send({
                            message: "success",
                            user
                        })

                        // cerrar metodo de guardar 
                    }) 

                    // cerrar metodo bcrypt
                    
                }else{
                    return res.status(200).send({
                        message: "usuario ya registrado, tus datos coinciden con un usuario ya registrado"
                    })
                }
            })

        }else{
            return res.status(200).send({
                message: "error de validacion, datos incorrectos."
            })
        } 

    },

    login: function(req, res){
        // Recoger los parametros de la peticion
        var params = req.body

        try {
            // Validar los datos
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email)
            var validate_password = !validator.isEmpty(params.password) 
        } catch (ex) {
            return res.status(404).send({
                message: "faltan datos"
            })
        }
        
        
        if(!validate_email || !validate_password){

            return res.status(200).send({
                message: "Datos enviados, erroneamente"
            })
        }
        
        // Buscar usuarios que coincidan
        User.findOne({email: params.email.toLowerCase()}, (error, user)=>{
            if(error){
                return res.status(500).send({
                    message: "Error a comprobar duplicidad del usuario"
                })
            }

            if(!user){
                return res.status(404).send({
                    message: "El usuario no existe"
                })
            }
       
        // silo encientra comprobar contrasena u usuario
        bcrypt.compare(params.password, user.password, (err, check) =>{
        
        // si es correcto
        if(check){
            //  generar token de jwt y devolverlo
            if(params.getToken){
                return res.status(200).send({
                    token: jwt.createToken(user)
                })
            }else{
                // limpiar  el objeto
                user.password = undefined

                // si las credenciales son correctas devolverlos datos
                return res.status(200).send({
                    message: "success",
                    user
                })
            }

            
        }else{
            return res.status(404).send({
                message: "las credenciales no son correctas"
               
            })
        }

        })

    })

        
    },

    update: function(req, res){
        // recoger los datos del usuario
        var params = req.body

        // validar datos
        try {
            var validate_name = !validator.isEmpty(params.name)
            var validate_surname = !validator.isEmpty(params.surname)
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email)
        
        } catch (ex) {
            return res.status(404).send({
                message: "faltan datos por enviar"               
            })
        }
                
        // Eliminar propiedaddes innesearias
        delete params.password

        // Buscar y actualizar
        var userId = req.user.sub

        // Comprobar si el imail es unico.
        if(req.user.email != params.email){
            User.findOne({email: params.email.toLowerCase()}, (error, user)=>{
                if(error){
                    return res.status(500).send({
                        message: "Error a comprobar duplicidad del usuario"
                    })
                }
            
                if(user && user.email == user.params.email){
                    return res.status(200).send({
                        status: "error",
                        message: "El email no puede ser modificado"
                    })
                }else{
                    // Buscar y actualizar documento
                    User.findOneAndUpdate({_id: userId}, params, {new: true}, (err, userUpdate) => {
                        if(err || !userUpdate){
                            return res.status(404).send({
                                status: 'error',
                                message: 'error al actualizar usuario',                
                            })
                        }
                        
                        // devolver una respuesta
                        return res.status(200).send({
                            status: 'success',
                            user: userUpdate
                        })
                    })
                }


            })

        }else{
            // Buscar y actualizar documento
            User.findOneAndUpdate({_id: userId}, params, {new: true}, (err, userUpdate) => {
                if(err || !userUpdate){
                    return res.status(404).send({
                        status: 'error',
                        message: 'error al actualizar usuario',                
                    })
                }
                
                // devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    user: userUpdate
                })
            })
        }
    },

    upload_avatar: function(req, res){
        // conf el modulo multiparty. Hecho en el userRoutes.js

        // recoger el fichero de la peticion. 
        var file_name = "avatar no subido"

        console.log(req.files)

        if(!req.files){
            return res.status(404).send({
                status: "error",
                message: file_name
                
            })
        }

        // conseguir nombre y extencion. 
        var file_path = req.files.file0.path
        console.log(file_path)
        var file_split = file_path.split('\\') 

        // nombre del archivo.
        var file_name = file_split[2]

        // extencion del archivo
        var ext_split = file_name.split('\.')
        var file_ext = ext_split[1]

        // comprobar extenciones (img), y si no es valida borrar obejto subido.
        if (file_ext != "png" && file_ext != "jpg" && file_ext != "jpeg" && file_ext != "gif" ){
            // para acceder a la ruta del archivo y lo elimine
            fs.unlink(file_path, (err)=>{
                if(err){
                    return res.status(200).send({
                        status: "error",
                        message: 'extencion del archivo no es valida'
                    })  
                }
            })   

        }else{
            // sacar  id del usuario identificado.
            var userId = req.user.sub

            // buscar y actualizar el usuario.  
            User.findOneAndUpdate({_id: userId}, {image: file_name}, {new: true}, (err, userUpdated)=> {
                if(err || !userUpdated){
                    // Devolver respuesta.
                    return res.status(500).send({
                        status: "ERROR",
                        message: 'error al guardar la imagen'                      
                    })
                }
                
                // Devolver respuesta.
                return res.status(200).send({
                    status: "success",
                    user: userUpdated
                    
                })
            })
            
        }
        

    },

    avatar: function(req, res){
        var file_name = req.params.file_name
        var path_file = "./uploads/users/" + file_name

        fs.exists(path_file, (exists) =>{
            if(exists){
                return res.sendFile(path.resolve(path_file))
            }else{
                return res.status(404).send({
                    message: "imagen no existe"
                })
            }
        })
    },

    getUsers: function(req, res){
        User.find().exec((err, users)=>{
            if(err || !users){
                return res.status(404).send({
                    status: "error",
                    message: "no hay usuariuos"
                })
            }

            return res.status(200).send({
                status: "success",
                users
            })
        })
    },

    getUser: function(req, res){
        var userId = req.params.userId

        User.findById(userId).exec((err, user)=>{
            if(err || !user){
                return res.status(404).send({
                    status: "error",
                    message: "no existe el usuario"
                })
            }

            return res.status(200).send({
                status: "success",
                user
            })
        })
    },

}

// Exportar el controlador
module.exports = userController
