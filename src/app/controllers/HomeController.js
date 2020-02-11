const Recipe = require('../models/Recipe')
const db = require('../../config/db')
const Chef = require('../models/Chef')

module.exports = {
    async index(req, res) {
        try {
            const recipes = await Recipe.topSix()
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
            const { search } = req.query
      
            if (search) {
                const recipes = await Recipe.search(search)
                return res.render("home/recipes", { recipes })
            } else {
                const recipes = await Recipe.search('')
                return res.render("home/recipes", { recipes })
            }
        } catch (err) {
            console.error(err)
        }
    },
    async details(req, res) {
        try {
            const recipe = await Recipe.details(req.params.id)
            return res.render("home/recipeDetails", {recipe})
        } catch (err) {
            console.error(err)
        }
    },
    async chefs(req, res) {
        try {
            const chefs = Chef.findAllAvatar()

            return res.render("home/chefs", { chefs })
        } catch (err) {
            console.error(err)
        }
    }
}