const User = require('../models/User')

module.exports = {
    async index(req, res) {
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

}