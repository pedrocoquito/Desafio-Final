const express = require('express')
const routes = express.Router()

const ChefController = require('../app/controllers/ChefController')
const { isAdmin } = require('../app/middlewares/session')

routes.get('/chefs', ChefController.index)
routes.get('/chefs/create', ChefController.create)
routes.get('/chefs/:id', ChefController.show)
routes.get('/chefs/:id/edit', ChefController.edit)

routes.post('/chefs', isAdmin, ChefController.post)
routes.put('/chefs', isAdmin, ChefController.put)
routes.delete('/chefs', isAdmin, ChefController.delete)

module.exports = routes