'use strict'

var express = require("express")
var userController = require("../controllers/UserController")
var router = express.Router()
var md_auth = require("../middlewares/autenticated")

// conf el modulo multiparty
var multipart = require("connect-multiparty")
var md_updload = multipart({uploadDir: './uploads/users'})



// Rutas de prueba 
router.get('/probando', userController.probando)

// Rutas de usuarios (y del api)
router.post('/register', userController.save)
router.post('/login', userController.login)
router.put('/update-user',  md_auth.authenticated ,userController.update)
router.get('/obtener-avatar/:file_name', userController.avatar)
router.get('/users', userController.getUsers)
router.get('/user/:userId', userController.getUser)

// conf el modulo multiparty
router.post('/avatar', [md_auth.authenticated, md_updload], userController.upload_avatar)


module.exports = router