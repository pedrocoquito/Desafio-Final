
const Recipe = require('../models/Recipe')

module.exports = {
    async index(req, res) {
        try {
            return res.render("admin/recipes/index")
        } catch (err) {
            console.error(err)
        }
    },
    async show(req, res) {
        try {
            return res.render("home/index")
        } catch (err) {
            console.error(err)
        }
    },
    async create(req, res) {
        try {
            return res.render("home/index")
        } catch (err) {
            console.error(err)
        }
    },
    async post(req, res) {
        try {
            return res.render("home/index")
        } catch (err) {
            console.error(err)
        }
    },
    async edit(req, res) {
        try {
            return res.render("home/index")
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
            return res.render("home/index")
        } catch (err) {
            console.error(err)
        }
    }
}