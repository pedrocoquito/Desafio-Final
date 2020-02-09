const User = require('../models/User')

module.exports = {
    async index(req, res) {
        try {
            const user = req.user
            return res.render("admin/users/index", { user })
        } catch (err) {
            console.error(err)
        }
    },
    async put(req, res) {
        try {
            const { name, email, id } = req.body

            await User.update(id, {
                name,
                email
            })

            return res.render('admin/users/index', {
                user: req.user,
                success: 'Conta atualizada com Sucesso!'
            })

        } catch (err) {
            console.error(err)
            return res.render('admin/users/index', {
                error: 'Erro inesperado, tente novamente'
            })
        }
    },
}