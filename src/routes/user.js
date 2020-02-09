const { Router } = require('express')
const routes = Router()

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')
const ProfileController = require('../app/controllers/ProfileController')

const SessionValidator = require('../app/validators/session')
const ProfileValidator = require('../app/validators/profile')
const UserValidator = require('../app/validators/user')

const { onlyUsers, isLoggedRedirectToProfile, isAdmin } = require('../app/middlewares/session')

routes.get('/login', isLoggedRedirectToProfile, SessionController.LoginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.get('/logout', SessionController.logout)

routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/password-reset', SessionValidator.reset, SessionController.reset)

routes.get('/users', UserController.list)
routes.post('/users', UserValidator.post, UserController.post)
routes.get('/users/create', isAdmin, UserController.create)
routes.put('/users', UserValidator.update, UserController.put)
routes.get('/users/:id/edit', isAdmin, UserController.edit)
routes.delete('/users', isAdmin, UserController.delete)

routes.get('/profile', onlyUsers, ProfileValidator.index, ProfileController.index)
routes.put('/profile', onlyUsers, ProfileValidator.edit, ProfileController.put)

module.exports = routes