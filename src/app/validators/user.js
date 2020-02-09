const User = require('../models/User')
const { compare } = require('bcryptjs')

function checkAllFields(body) {
    const keys = Object.keys(body)

    for (key of keys) {
        if (body[key] == "") {
            return {
                user: body,
                error: 'Por favor preencha todos os campos'
            }
        }
    }
}
async function post(req, res, next) {
    const fillAllFields = checkAllFields(req.body)

    if (fillAllFields) {
        return res.render("admin/users/create", fillAllFields)
    }

    let { name, email, password, admin } = req.body

    const user = await User.findOne({ where: { email } })

    if (user) return res.render('admin/users/create', {
        user: req.body,
        error: 'Usuário já cadastrado'
    })

    next()
}
async function update(req, res, next) {
    const fillAllFields = checkAllFields(req.body)

    if (fillAllFields) {
        return res.render("admin/users/edit", fillAllFields)
    }

    const { id, password } = req.body

    if(!password) return res.render("admin/users/edit", {
        user: req.body,
        error: "Informe sua senha para a atualizar seu cadastro"
    })

    const user = await User.findOne({ where: {id} })

    const passed = await compare(password, user.password)

    if(!passed) return res.render("admin/users/edit", {
        user: req.body,
        error: "Senha incorreta!"
    })

    req.user = user

    next()
}

module.exports = {
    post,
    show,
    update
}