
const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')
const db = require('../../config/db')
const { filteredArray } = require('../../lib/utils')

module.exports = {
    async index(req, res) {
        try {
            const admin = req.session.admin
            const recipes = await Recipe.search('')
            return res.render("admin/recipes/show", { recipes, admin })
        } catch (err) {
            console.error(err)
        }
    },
    async create(req, res) {
        try {
            const chefs = await Chef.findAll()
            return res.render("admin/recipes/create", { chefs })
        } catch (err) {
            console.error(err)
        }
    },
    async post(req, res) {
        try {
            let { chef_id, title, ingredients, preparation, information } = req.body

            ingredients = filteredArray(ingredients)
            preparation = filteredArray(preparation)

            console.log(ingredients)

            await Recipe.create({
                chef_id,
                title,
                ingredients,
                preparation,
                information
            })

            const recipes = await Recipe.search('')
            const admin = req.session.admin
            return res.render('admin/recipes/show', {
                recipes,
                admin,
                success: 'Receita Cadastrada!'
            })
        } catch (error) {
            console.error(error)
        }
    },
    async edit(req, res) {
        try {
            return res.render("admin/recipes/edit")
        } catch (err) {
            console.error(err)
        }
    },
    async put(req, res) {
        try {
            return res.render("home/index")
        } catch (err) {
            console.error(err)
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.body

            await Recipe.delete(id)
            const recipes = await Recipe.findAll()
            const admin = req.session.admin
            return res.render('admin/recipes/show', {
                recipes,
                admin,
                user: req.user,
                success: 'Conta Deletada!'
            })
        } catch (err) {
            console.log(err)
            const recipes = await Recipe.findAll()
            const admin = req.session.admin
            return res.render('admin/recipes/show', {
                recipes,
                admin,
                error: 'Erro inesperado!'
            })
        }
    }
}