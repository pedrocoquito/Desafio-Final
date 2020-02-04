const LoadRecipeService = require('../services/LoadRecipeService')

module.exports = {
    async index(req, res) {
        try {
            return res.render("home/index")
        } catch (err) {
            console.error(err)
        }
    },
    about(req, res){
        return res.render("home/about")
    },
    async recipes(req, res) {
        try {
            return res.render("home/index")
        } catch (err) {
            console.error(err)
        }
    },
    async info(req, res) {
        try {
            return res.render("home/index")
        } catch (err) {
            console.error(err)
        }
    },
    async chefs(req, res) {
        try {
            return res.render("home/index")
        } catch (err) {
            console.error(err)
        }
    }
}