const User = require('../models/User')
const { hash } = require('bcryptjs')

module.exports = {
    async list(req, res) {
        try {
            const admin = req.session.admin
            const users = await User.findAll()
            return res.render('admin/users/list', { users, admin })
        } catch (err) {
            console.error(err)
        }
    },
    async create(req, res) {
        try {
            const admin = req.session.admin
            return res.render('admin/users/create', { admin })
        } catch (err) {
            console.error(err)
        }
    },
    async post(req, res) {
        try {
            let { name, email, password, admin } = req.body
            if (typeof admin === 'undefined') {
                admin = false
            }
            password = await hash(password, 8)

            await User.create({ name, email, password, is_admin: admin })
            admin = req.session.admin
            const users = await User.findAll

            return res.render('admin/users/index', { users, admin })
        } catch (err) {
            console.error(err)
        }
    },
    async edit(req, res) {
        try {
            let id = req.params
            const user = await User.findOne({ where: id })
            const admin = req.session.admin
            return res.render(`admin/users/edit`, { user, admin })
        } catch (err) {
            console.error(err)
        }
    },
    async put(req, res) {
        try {
            let { id, name, email, admin } = req.body

            if (typeof admin === 'undefined') {
                admin = false
            }

            await User.update(id, {
                name,
                email,
                is_admin: admin
            })

            const users = await User.findAll()
            admin = req.session.admin

            return res.render('admin/users/list', {
                users,
                admin,
                success: 'Conta atualizada!'
            })
        } catch (err) {
            console.error(err)
            const users = await User.findAll()
            const admin = req.session.admin
            return res.render(`admin/users/edit`, {
                users,
                admin,
                error: 'Erro inesperado!'
            })
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.body

            await User.delete(id)
            const users = await User.findAll()
            const admin = req.session.admin

            return res.render('admin/users/list', {
                users,
                admin,
                success: 'Conta Deletada!'
            })
        } catch (err) {
            console.log(err)
            const admin = req.session.admin
            const users = await User.findAll()
            return res.render('admin/users/list', {
                users,
                admin,
                error: 'Erro inesperado!'
            })
        }
    }
}