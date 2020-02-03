const express = require('express')
const routes = express.Router()

const Homecontroller = require('../app/controllers/Homecontroller')

routes.get('/', Homecontroller.index)
routes.get('/about', Homecontroller.about)
routes.get('/recipes', Homecontroller.recipes)
routes.get('/recipes/:id',Homecontroller.info)
routes.get('/chefs', Homecontroller.chefs)

module.exports = routes