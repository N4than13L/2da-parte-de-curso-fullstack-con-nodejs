'use strict'

var express = require('express')
var comentController  = require("../controllers/comentController")

var router = express.Router()
var md_auth = require("../middlewares/autenticated")

router.post('/coment/topic/:topicId', md_auth.authenticated, comentController.add)
router.put('/coment/:commentId', md_auth.authenticated, comentController.update)
router.delete('/coment/:topicId/:comentId', md_auth.authenticated, comentController.delete)

module.exports = router