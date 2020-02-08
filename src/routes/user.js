const { Router } = require('express')
const routes = Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')
const ProfileController = require('../app/controllers/ProfileController')
const SessionValidator = require('../app/validators/session')

routes.get('/login', SessionController.LoginForm)
routes.post('/login',SessionValidator.login, SessionController.login)
routes.get('/logout', SessionController.logout)

routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/forgot-password',SessionValidator.forgot, SessionController.forgot)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/password-reset', SessionController.reset)

routes.get('/users', UserController.list)
routes.get('/users/create', UserController.create)
routes.get('/users/:id/edit', UserController.edit)
routes.post('/users', UserController.post)
routes.put('/users', UserController.put) 
routes.delete('/users', UserController.delete) 

routes.get('/profile', ProfileController.index)
routes.put('/profile', ProfileController.put)

module.exports = routes