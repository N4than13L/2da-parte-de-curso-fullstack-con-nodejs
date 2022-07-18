'use strict'

var express = require('express')
var TopicController = require("../controllers/topicController")

var router = express.Router()
var md_auth = require("../middlewares/autenticated")

router.get('/test', TopicController.test)
router.post('/topic', md_auth.authenticated, TopicController.save)
router.get('/topics/:page?', TopicController.getTopics)



module.exports = router