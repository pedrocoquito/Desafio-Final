
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
            let id = req.params
            const admin = req.session.admin
            const chefs = await Chef.findAll()
            const recipe = await Recipe.findOne({ where: id })
            return res.render("admin/recipes/edit", { recipe, chefs, admin })
        } catch (err) {
            console.error(err)
        }
    },
    async put(req, res) {
        try {
            let { id, chef_id, title, ingredients, preparation, information } = req.body

            await Recipe.update(id, {
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
                success: 'Receita atualizada!'
            })
        } catch (err) {
            console.error(err)
            const recipes = await Recipe.search('')
            const admin = req.session.admin
            return res.render(`admin/recipes/show`, {
                recipes,
                admin,
                error: 'Erro inesperado!'
            })
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.body
            await Recipe.deleteImages(id)
            await Recipe.delete(id)
            const recipes = await Recipe.search('')
            const admin = req.session.admin
            return res.render('admin/recipes/show', {
                recipes,
                admin,
                user: req.user,
                success: 'Receita Deletada!'
            })
        } catch (err) {
            console.log(err)
            const recipes = await Recipe.search('')
            const admin = req.session.admin
            return res.render('admin/recipes/show', {
                recipes,
                admin,
                error: 'Erro inesperado!'
            })
        }
    }
}