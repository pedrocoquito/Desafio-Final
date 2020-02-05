const Recipe = require('../models/Recipe')

module.exports = {
    async index(req, res) {
        try {
            const recipes = await Recipe.search('t')
            return res.render('home/index', { recipes })
        } catch (err) {
            console.error(err)
        }
    },
    about(req, res) {
        return res.render("home/about")
    },
    async recipes(req, res) {
        try {
            return res.render("home/recipes")
        } catch (err) {
            console.error(err)
        }
    },
    async info(req, res) {
        try {
            const recipe = await Recipe.find(req.params.id)
            return res.render("home/recipeInfo", {recipe})
        } catch (err) {
            console.error(err)
        }
    },
    async chefs(req, res) {
        try {
            return res.render("home/chefs")
        } catch (err) {
            console.error(err)
        }
    }
}