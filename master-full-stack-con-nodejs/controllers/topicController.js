'use strict'
var validator = require("validator")

var Topic = require("../models/topic")

var TopicController = {
    test: function(req, res){
        return res.status(200).send({
            message: "hola desde topic controler"
        })
    },
    save: function(req, res){

        // Recoger parametros por post.
        var params = req.body

        // Validar datos.
        try {
            var validate_title = !validator.isEmpty(params.title)
            var validate_content = !validator.isEmpty(params.content)
            var validate_lang = !validator.isEmpty(params.lang)
        
        } catch (err) {
            return res.status(200).send({
                message: "Faltan datos por enviar."
            })
        }

        if (validate_content && validate_lang && validate_title){
            // Crear objeto a guardar. 
            var topic = new Topic()
 
            // Asignar valores.
            topic.title = params.title
            topic.content = params.content
            topic.code = params.code
            topic.lang = params.lang
            topic.user = req.user.sub

            // Guardar el topic.
            topic.save((err, topicStored) => {
                if (err || !topicStored) {
                    // Devolver respuesta de error si no se han podido guardar.
                    return res.status(200).send({
                        status: "error",
                        message: "tema no guardado"
                    })
                }
                
                // Devolver respuesta de exito.
                return res.status(200).send({
                    status: "success",
                    topicStored
                })
            })

        }else{
            // Devolver respuesta de error.
            return res.status(200).send({
                message: "Los datos no son validos"
            })
        }
    },

    getTopics: function(req, res){
        // Cargar la libreria de paginacion en la clase en el modelo.
        
        // Recoger la pagina actual

        if(req.params.page == null || req.params.page == 0 
            || req.params.page == "0" || req.params.page == undefined 
            || req.params.page == false){
            page = 1
        }
        else{
            var page = parseInt(req.params.page)  
        }
        
        // Indicar las obciones de paginacion.
        var options = {
            sort: {date: -1},
            populate: 'user',
            limit: 5,
            page: page
        }

        // Find paginado
        Topic.paginate({}, options, (err, topics) =>{
            if(err || !topics){
                return res.status(404).send({
                    status: "not-found",
                    message: "error no hay topics"
                })
            }    
            // Devolver resultado (topics, el total de los topics y paginas). 
            return res.status(200).send({
                status:"success",
                topics: topics.docs,
                totalDocs: topics.totalDocs,
                totalpages: topics.totalDocs
            })
        })
        
    }
}

module.exports = TopicController