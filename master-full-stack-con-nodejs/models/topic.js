'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema

// Modelo de Comment.
var CommentSchema = Schema({
    content: String,
    date: {type: Date, default: Date.now},
    user: { type: Schema.ObjectId, ref : 'User'}
})

var Comments = mongoose.model("Comment", CommentSchema)


// Modelo de Topic.
var TopicSchema = Schema({
    title: String,
    content: String,
    language: String,
    date: {type: Date, default: Date.now},
    user: { type: Schema.ObjectId, ref : 'User'},
    comments: [CommentSchema]
})

// Exportar el modelo.
module.exports = mongoose.model("Topic", TopicSchema)

