const express = require('express')
const routes = express.Router()

const RecipeController = require('../app/controllers/RecipeController')

routes.get('/recipes', RecipeController.index) 
routes.get('/recipes/create', RecipeController.create) 
routes.get('/recipes/:id', RecipeController.show) 
routes.get('/recipes/:id/edit', RecipeController.edit) 

routes.post('/recipes', RecipeController.post) 
routes.put('/recipes', RecipeController.put) 
routes.delete('/recipes', RecipeController.delete)

module.exports = routes