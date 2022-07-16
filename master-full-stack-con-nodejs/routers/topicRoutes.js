'use strict'

var express = require('express')
var TopicController = require("../controllers/topicController")

var router = express.Router()
var md_auth = require("../middlewares/autenticated")

router.get('/test', TopicController.test)

module.exports = router