const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')
const chef = require('./chef')
const recipe = require('./recipe')
const user = require('./user')

routes.get('/', HomeController.index)
routes.get('/about', HomeController.about)
routes.get('/recipes', HomeController.recipes)
routes.get('/recipes/:id',HomeController.details)
routes.get('/chefs', HomeController.chefs)

routes.use('/admin', chef)
routes.use('/admin', recipe)
routes.use('/admin', user)

routes.get('/admin', function(req, res) {
    res.redirect('/admin/recipes')
})
routes.get('/recipes', function(req, res) {
    res.redirect('/admin/recipes')
})
routes.get('/chefs', function(req, res) {
    res.redirect('/admin/chefs')
})
routes.get('/users', function(req, res) {
    res.redirect('/admin/users')
})

module.exports = routes

