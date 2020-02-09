const User = require('../models/User')

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
            let { name, email, password, is_admin } = req.body

            password = await hash(password, 8)

            const userId = await User.create({
                name,
                email,
                password,
                is_admin
            })

            req.session.userId = userId

            return res.redirect('admin/users/create')
        } catch (err) {
            console.error(err)
        }
    },
    async edit(req, res) {
        try {
            const { body } = req

            return res.render(`admin/users/edit`, { user })
        } catch (error) {
            console.error(error)
        }
    },
    async put(req, res) {
        try {
            const { id, name, email, is_admin } = req.user

            await User.update(id, {
                name,
                email,
                is_admin
            })

            return res.render('admin/users/edit', {
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

            return res.redirect('/admin/users')
        } catch (err) {
            console.log(err)

            return res.render('admin/users/edit', {
                user,
                error: 'Erro inesperado!'
            })
        }
    }
}