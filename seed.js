const faker = require('faker')
const { hash } = require('bcryptjs')

const db = require('./src/config/db')
const User = require('./src/app/models/User')
const Recipe = require('./src/app/models/Recipe')
const File = require('./src/app/models/File')
const Chef = require('./src/app/models/Chef')

let totalUsers = 2
let totalChefs = 2
let recipesIds = []
let totalRecipes = 3
let filesIds = []

async function createUsers() {
    const users = []
    const password = await hash('1234', 8)

    users.push({
        name: 'admin',
        email: 'admin@email.com',
        password,
        is_admin: true
    })

    while (users.length < totalUsers) {
        users.push({
            name: faker.name.findName(),
            password,
            email: faker.internet.email(),
            is_admin: false
        })
    }

    const usersPromise = users.map(user => User.create(user))

    usersIds = await Promise.all(usersPromise)
}

async function createChefs() {
    const chefs = []
    const files = []

    while (files.length < totalChefs) {
        files.push({
            name: faker.image.image(),
            path: `public/images/chef.png`
        })
    }

    File.init({ table: 'files' })
    const filesPromise = files.map(file => File.create(file))
    const chefsPhotosIds = await Promise.all(filesPromise)

    while (chefs.length < totalChefs) {
        chefs.push({
            name: faker.name.findName(),
            file_id: chefsPhotosIds[chefs.length]
        })
    }

    const chefsPromise = chefs.map(chef => Chef.create(chef))
    chefsIds = await Promise.all(chefsPromise)
}

async function createRecipes() {
    const recipes = []

    while (recipes.length < totalRecipes) {
        recipes.push({
            chef_id: Math.ceil(Math.random() * totalUsers),
            title: faker.name.title()
        })
    }

    const recipesPromise = recipes.map(recipe => Recipe.create(recipe))
    recipesIds = await Promise.all(recipesPromise)

    let query = "update recipes set ingredients = '{1kg de carne moída, 300gr de bacon, 8 ovos, 8 pães de hambúrguer}'"
    await db.query(query)

    query = "update recipes set preparation = '{Faça porções de 100gr de carne., frite o bacon e os ovos., Monte os burguers!}'"
    await db.query(query)

    query = "update recipes set information = 'Preaqueça a chapa, frigideira ou grelha por 10 minutos antes de levar os hambúrgueres. Adicione um pouquinho de óleo ou manteiga e não amasse os hambúrgueres!'"
    await db.query(query)
}

async function createFiles() {
    const files = []

    while (files.length < 5) {
        files.push({
            name: faker.image.image(),
            path: `public/images/burger.png`
        })
    }

    File.init({ table: 'files' })
    const filesPromise = files.map(file => File.create(file))

    filesIds = await Promise.all(filesPromise)


    File.init({ table: 'recipe_files' })
    const relationPromise = filesIds.map(id => File.create({
        recipe_id: Math.ceil(Math.random() * totalRecipes),
        file_id: id
    }))

    await Promise.all(relationPromise)
}

async function init() {
    await createUsers()
    await createChefs()
    await createRecipes()
    await createFiles()
}

init()