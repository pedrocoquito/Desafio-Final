const express = require('express')
const routes = express.Router()

const RecipeController = require('../app/controllers/RecipeController')
const { isAdmin } = require('../app/middlewares/session')

routes.get('/recipes', RecipeController.index)
routes.get('/recipes/create', RecipeController.create)
routes.get('/recipes/:id/edit', RecipeController.edit)

routes.post('/recipes', isAdmin, RecipeController.post)
routes.put('/recipes', isAdmin, RecipeController.put)
routes.delete('/recipes', isAdmin, RecipeController.delete)

module.exports = routes