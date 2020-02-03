const express = require('express')
const routes = express.Router()

const ChefController = require('../app/controllers/ChefController')

routes.get('/chefs', ChefController.index)
/*routes.get('/chefs/create', ChefController.create)
routes.get('/chefs/:id', ChefController.show)
routes.get('/chefs/:id/edit', ChefController.edit)

routes.post('/chefs', ChefController.post)
routes.put('/chefs', ChefController.put)
routes.delete('/chefs', ChefsController.delete)*/

module.exports = routes