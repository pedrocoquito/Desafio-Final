const User = require('../models/User')
const { hash } = require('bcryptjs')

module.exports = {
    async list(req, res) {
        try {
            const users = await User.findAll()
            return res.render('admin/users/list', { users })
        } catch (err) {
            console.error(err)
        }
    },
    async create(req, res) {
        try {
            return res.render('admin/users/create')
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

            const users = await User.findAll

            return res.render('admin/users/index', { users })
        } catch (err) {
            console.error(err)
        }
    },
    async edit(req, res) {
        try {
            let id = req.params
            const user = await User.findOne({ where: id })

            return res.render(`admin/users/edit`, { user })
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

            return res.render('admin/users/list', {
                users,
                user: req.user,
                success: 'Conta atualizada!'
            })
        } catch (err) {
            console.error(err)
            return res.render(`admin/users/edit`, {
                error: 'Erro inesperado!'
            })
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.body

            await User.delete(id)
            const users = await User.findAll()

            return res.render('admin/users/list', {
                users: users,
                user: req.user,
                success: 'Conta Deletada!'
            })
        } catch (err) {
            console.log(err)

            return res.render('admin/users/list', {
                user,
                error: 'Erro inesperado!'
            })
        }
    }
}