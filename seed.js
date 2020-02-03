const faker = require('faker')
const { hash } = require('bcryptjs')
const db = require('./src/config/db')

const User = require('./src/app/models/User')
const Chefs = require('./src/app/models/Chef')
const Recipes = require('./src/app/models/Recipe')
const File = require('./src/app/models/File')

