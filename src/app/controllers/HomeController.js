const Recipe = require('../models/Recipe')
const db = require('../../config/db')

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
            const query = 'select c.*, count(r) as recipes, f.path as image from chefs as c left join recipes as r on (r.chef_id = c.id) left join files as f on (c.file_id = f.id) group by c.id, f.path'
            
            const results = await db.query(query)
            const chefs = results.rows

            return res.render("home/chefs", { chefs })
        } catch (err) {
            console.error(err)
        }
    }
}