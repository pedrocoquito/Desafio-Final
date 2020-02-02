const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/UserController')
const SessionController = require('../app/controllers/SessionController')

routes.get('/register', UserController.registerForm)
routes.post('/register', UserController.post)
routes.post('/logout', SessionController.logout)
/*const SessionController = require('../app/controllers/SessionController')
const OrderController = require('../app/controllers/OrderController')

const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')

const { isLoggedRedirectToUsers, onlyUsers } = require('../app/middlewares/session')

routes.get('/login', isLoggedRedirectToUsers, SessionController.LoginForm)
routes.post('/login', SessionValidator.login, SessionController.login)

routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/password-reset', SessionValidator.reset, SessionController.reset)

routes.get('/', onlyUsers, UserValidator.show, UserController.show)
routes.put('/', UserValidator.update, UserController.update)
routes.delete('/', UserController.delete)

routes.get('/ads', UserController.ads)

routes.post('/orders', onlyUsers, OrderController.post)*/

module.exports = routes