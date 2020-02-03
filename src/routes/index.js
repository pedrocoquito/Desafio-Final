const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')
const chef = require('./chef')

routes.get('/', HomeController.index)
routes.get('/about', HomeController.about)
routes.get('/recipes', HomeController.about)
routes.get('/recipes/:id',HomeController.about)
routes.get('/chefs', HomeController.about)

routes.use('/admin', chef)


module.exports = routes

