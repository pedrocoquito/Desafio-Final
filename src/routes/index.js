const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')

const recipes = require('../routes/recipes')
const chefs = require('../routes/chefs')
const users = require('./users')

routes.get("/", HomeController.index)
routes.get("/about", HomeController.about)
routes.get('/recipes', HomeController.recipes)
routes.get('/recipes/:id',HomeController.info)
routes.get('/chefs', HomeController.chefs)

routes.use('/admin', users)
routes.use('/admin', chefs)
routes.use('/admin', recipes)

routes.get('/admin', function(req, res) {
    return res.redirect('/admin/recipes')
})
routes.get('/recipes', function(req, res) {
    return res.redirect('/admin/recipes')
})
routes.get('/chefs', function(req, res) {
    return res.redirect('/admin/chefs')
})
routes.get('/users', function(req, res) {
    return res.redirect('/admin/users')
})

module.exports = routes

