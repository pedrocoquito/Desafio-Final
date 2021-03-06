const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')
const db = require('../../config/db')
const File = require('../models/File')

module.exports = {
    async index(req, res) {
        try {
            const admin = req.session.admin
            const chefs = await Chef.findAllAvatar()
            return res.render('admin/chefs/list', { chefs, admin })
        } catch (err) {
            console.error(err)
        }
    },
    async show(req, res) {
        try {
            const id = req.params.id
            let query = `
            select c.*, count(r) as recipes, f.path as image 
            from chefs as c 
            left join recipes as r on (r.chef_id = c.id) 
            left join files as f on (c.file_id = f.id) 
            where c.id = ${id}
            group by c.id, f.path
            `
            let results = await db.query(query)
            const chefs = results.rows[0]

            query = `
            select r.*, REPLACE(f.path, 'public', '') as img, c.name AS author 
            from recipes AS r
            left join recipe_files as rf on (r.id = rf.recipe_id)
            LEFT JOIN chefs as c ON (r.chef_id = c.id)
            LEFT join files as f on (f.id = rf.file_id)
            where r.chef_id = ${id}
            GROUP BY r.id, f.path, c.name
            `
            results = await db.query(query)
            const recipes = results.rows
            const admin = req.session.admin


            return res.render('admin/chefs/index', { chefs, admin, recipes })
        } catch (error) {
            console.error(error)
        }
    },
    async create(req, res) {
        try {
            const admin = req.session.admin
            return res.render("admin/chefs/create", { admin })
        } catch (err) {
            console.error(err)
        }
    },
    async post(req, res) {
        try {

            await Chef.create({
                name: req.body.name,
                file_id: 1
            })

            const chefs = await Chef.findAllAvatar()
            const admin = req.session.admin

            return res.redirect('/admin/chefs', { chefs, admin })
        } catch (error) {
            console.error(error)
        }
    },
    async edit(req, res) {
        try {
            let id = req.params
            const chef = await Chef.findOne({ where: id })

            return res.render(`admin/chefs/edit`, { chef })
        } catch (err) {
            console.error(err)
        }
    },
    async put(req, res) {
        try {
            let { id, name } = req.body

            await Chef.update(id, {
                name
            })

            const chefs = await Chef.findAllAvatar()
            const admin = req.session.admin

            return res.render('admin/chefs/list', {
                chefs,
                admin,
                success: 'Conta atualizada!'
            })
        } catch (err) {
            console.error(err)
            const chefs = await Chef.findAllAvatar()
            const admin = req.session.admin
            return res.render(`admin/chefs/edit`, {
                chefs,
                admin,
                error: 'Erro inesperado!'
            })
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.body

            let query = `
            delete from recipe_files where recipe_id in (select id from recipes where chef_id = ${id})
            `
            await db.query(query)
            query = `
            delete from recipes where chef_id = ${id}
            `
            await db.query(query)
            const admin = req.session.admin
            await Chef.delete(id)

            const chefs = await Chef.findAllAvatar()
            return res.render('admin/chefs/list', {
                chefs,
                admin,
                success: 'Conta Deletada!'
            })
        } catch (err) {
            console.log(err)
            const chefs = await Chef.findAllAvatar()
            const admin = req.session.admin
            return res.render('admin/chefs/list', {
                chefs,
                admin,
                error: 'Erro inesperado!'
            })
        }
    }
}