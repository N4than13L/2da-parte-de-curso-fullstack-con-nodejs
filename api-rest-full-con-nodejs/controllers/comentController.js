'use strict'

var Topic = require('../models/topic');
var validator = require('validator');

var comentController = {
    add: function(req, res){
        // Recoger el id del topic por la url
        var topicId = req.params.topicId

        // find por el id del topic 
        Topic.findById(topicId).exec((err, topic) =>{
            if(err){
                return res.status(500).send({
                    status: "error",
                    message: "error en la peticion o no existe el tema"
                })
            }

            if(!topic){
                return res.status(404).send({
                    status: "error",
                    message: "No existe el tema"
                })
            }
            
            // comprobar el objeto de usuario y validar datos
            if(req.body.content){
                // Validar datos.
                try {
                    var validate_content = !validator.isEmpty(req.body.content)
         
                } catch (err) {
                    return res.status(200).send({
                        message: "No has comentado nada"
                    })
                }

                if(validate_content){
                    var comment = {
                        user: req.user.sub,
                        content: req.body.content
                    }

                    // En la propiedad coments del objeto del objeto resultante hacer un push.
                    topic.comments.push(comment)
                    
                    // guardar el topic completo.
                    topic.save((err) =>{
                        if(err){
                            return res.status(500).send({
                                status: "error",
                                message: "error en la peticion o no existe el tema"
                            })
                        }

                        // Devolver una respuesta.
                        return res.status(200).send({
                            status: "success",
                            topic
                        })
                    })
                        
                    
                }else{
                    return res.status(200).send({
                        message: "No se ha validado correctamente"
                    })
                }
            }
        })
 
    },

    update: function(req, res){
        // Conseguir id de comnetario de la url
        var commentId = req.params.comentId

        // Recoger datos y validar
        var params = req.body

        // Validar datos.
        try {
            var validate_content = !validator.isEmpty(req.body.content)
        } catch (err) {
            return res.status(200).send({
                message: "No has comentado nada"
            })
        }

        if(validate_content){
            // FindAnfUpdate de un subdocumento 
            Topic.findOneAndUpdate(
                {"comments._id": commentId},
                {
                    "$set": {
                        "comments._id": commentId, "user": req.user.sub
                    }
                }, {new: true },
                (err, topicUpdated) => {
                    
                    if(err){
                        return res.status(500).send({
                            status: "error",
                            message: "error en la peticion "
                        })
                    }

                    if(!topicUpdated){
                        return res.status(500).send({
                            status: "error",
                            message: "no existe el tema"
                        })
                    }
                    
                    // Devolver los datos
                    return res.status(200).send({
                        status: "success",
                        topic: topicUpdated
                    })
                }
            )
        }

    },

    delete: function(req, res){
        // Sacar el id del topic y del comentario.
        var topicId = req.params.topicId
        var commentId = req.params.commentId

        // Buscar el Topic.
        Topic.findById(topicId, (err, topic) => {
        if(err){
            return res.status(500).send({
                status: "error",
                message: "Error en la peticion"
            })
        }
        if(!topic){
            return res.status(500).send({
                status: "error",
                message: "No existe el topic"
            })
        }

        // Seleccionar el subdocumento (comentario).
        var comment = topic.comments.id(commentId)

        // Borrar el comentario.
        if(comment){
            comment.remove()
        
            // Guardar el comentario.
            topic.save((err) => {
                if(err){
                    return res.status(500).send({
                        status: "error",
                        message: "Error en la peticion"
                    })
                }
                // Devolver el resultado.
                return res.status(200).send({
                    status: "success",
                    topic
                })
            })
             
        }else{
            return res.status(404).send({
                status: "error",
                message: "no existe el comentaro :("
            })
        }
    })
        
  },

  
}

module.exports = comentController
