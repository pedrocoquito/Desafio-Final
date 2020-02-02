const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')

const users = require('./users')

routes.get("/", HomeController.index)
routes.get("/about", HomeController.about)

routes.use('/users', users)

routes.get("/accounts", function(req, res) {
    return res.redirect("/users/login")
})

const UserController = require('../app/controllers/UserController')
routes.get('/users', UserController.registerForm)
routes.post('/register', UserController.post)

module.exports = routes

