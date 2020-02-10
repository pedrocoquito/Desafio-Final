const Chef = require('../models/Chef')
const db = require('../../config/db')

module.exports = {
    async index(req, res) {
        try {
            const admin = req.session.admin
            const query = 'select c.*, f.path as image from chefs as c left join files as f on (c.file_id = f.id) group by c.id, f.path'
            const results = await db.query(query)
            const chefs = results.rows
            return res.render('admin/chefs/list', { chefs, admin })
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
            return res.render("admin/chefs/create")
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