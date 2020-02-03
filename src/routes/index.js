const express = require('express')
const routes = express.Router()

const Homecontroller = require('../app/controllers/Homecontroller')

const chef = require('../routes/chef')
const recipe = require('../routes/recipe')
const user = require('../routes/user')

routes.get('/', Homecontroller.index)
routes.get('/about', Homecontroller.about)
routes.get('/recipes', Homecontroller.recipes)
routes.get('/recipes/:id',Homecontroller.info)
routes.get('/chefs', Homecontroller.chefs)

routes.use('/admin', chef)
routes.use('/admin', recipe)
routes.use('/admin', user)

routes.get('/admin', function(req, res) {
    return res.redirect("/admin/recipes")
})
routes.get('/recipes', function(req, res) {
    return res.redirect("/admin/recipes")
})
routes.get('/chefs', function(req, res) {
    return res.redirect("/admin/chefs")
})
routes.get('/users', function(req, res) {
    return res.redirect("/admin/users")
})

module.exports = routes