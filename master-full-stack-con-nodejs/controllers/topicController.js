'use strict'

var TopicController = {
    test: function(req, res){
        return res.status(200).send({
            message: "hola desde topic controler"
        })
    }
}

module.exports = TopicController