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
        
    },

    getMyTopicsByUser: function(req, res){
        // Conseguir el id del usuario.
        var userId = req.params.user

        // Find con una condicion de usuario.
        Topic.find({
            user: userId
        })

        .sort([['date', 'descending']])
        .exec((err, topics) =>{
            if (err && !topics){
                // response.
                return res.status(500).send({
                    status: "error",
                    message: "error en la peticion o no hay temas para mostrar"
                })
            }

            // Devolver respuesta.
            return res.status(200).send({
                status: "success",
                topics    
            })
        })
    },

    getTopic: function(req,res){
        // sacar el id del del topic de la url
        var topicId = req.params.id

        // Find por id del topic 
        Topic.findById(topicId)
        .populate('user')
        .exec((err, topic) => {
            
            if (err && !topic){
                // Devolver respuesta
                return res.status(404).send({
                    message: "no existe el tema"
                })
            }

            // Devolver respuesta
            return res.status(200).send({
                status: "suceess",
                topic
            })

        })
    },

    update: function (req, res) {
        // recoger el id del topic (por url)
        
        var topic_id = req.params.id

        // recoger los datos que llegan desde post

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

        if(validate_title && validate_content && validate_lang){
            // Montar un json con los datos modificables\
            var update = {
                title: params.title,
                content: params.content,
                code: params.code,
                lang: params.lang
            }

            // Find and update del topic por id e id de usuario.
            Topic.findOneAndUpdate({_id: topic_id, user: req.user.sub}, update, {new: true}, (err,topicUpdated)=>{
                if(err || !topicUpdated){
                    return res.status(500).send({
                        message: "error, no se ha actualizado"
                    })    
                }
                
                // Devolver una respuesta
                return res.status(200).send({
                    status: "success",
                    topic: topicUpdated
                })
            } )

            
        }else{
            // Devolver una respuesta
            return res.status(404).send({
                message: "la validacion no es correcta"
            })
        }   
    },
    delete: function(req, res){
        // Sacar el id del topic de la url
        var topic_id = req.params.id

        // Find and delete por topicId y por el userId
        Topic.findByIdAndDelete({_id: topic_id, user: req.user.sub}, (err, topicRemoved)=>{
            
            if(err || !topicRemoved){
                return res.status(500).send({
                    status: "error",
                    message: "error, al eliminar ya que no existe"
                })    
            }

            // Devolver respuesta.
            return res.status(200).send({
                status: "success",
                topic: topicRemoved
            })
        }) 
    },
    search: function (req, res) {
        //sacar string a buscar de la url
        var SearchString = req.params.search;
 
        //find con or
        Topic.find({
            "$or": [//si se cumple albguna de estas condiciones
                { "title": { "$regex": SearchString, "$options": "i" } },//SeachString contenido en title
                { "content": { "$regex": SearchString, "$options": "i" } },//SeachString contenido en el content
                { "lang": { "$regex": SearchString, "$options": "i" } },//SeachString contenido en el lang
                { "code": { "$regex": SearchString, "$options": "i" } },//SeachString contenido en el code
                { "comments.content": { "$regex": SearchString, "$options": "i" } },
            ]
        }).exec((err, topics) => {
 
            if (err) {
                return res.status(500).send({
                    status: "error",
                    message: "Error en la peticion",
                    err
                });
            }
            if (!topics) {
                return res.status(404).send({
                    status: 'error',
                    message: "No hay temas disponibles"
                })
            }
            //devolver resultado
            return res.status(200).send({
                status: 'success',
                topics
            });
        });
    }
}

module.exports = TopicController