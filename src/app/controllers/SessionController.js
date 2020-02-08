const User = require('../models/User')

const { hash } = require('bcryptjs')
const crypto = require('crypto')
const mailer = require('../../lib/mailer')

module.exports = {
    LoginForm(req, res) {
        try {
            return res.render("admin/session/login")
        } catch (err) {
            console.error(err)
        }
    },
    login(req, res) {
        try {
            req.session.userId = req.user.id
            return res.render("/")
        } catch (err) {
            console.error(err)
        }
    },
    async logout(req, res) {
        try {
            await req.session.destroy()
            return res.redirect('/')
        } catch (err) {
            console.error(err)
        }
    },
    forgotForm(req, res) {
        try {
            return res.render("admin/session/forgot-password")
        } catch (err) {
            console.error(err)
        }
    },
    async forgot(req, res) {
        const user = req.user

        try {
            const token = crypto.randomBytes(20).toString("hex")

            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            await mailer.sendMail({
                to: user.email,
                from: 'noreply@foodfy.com',
                subject: 'Recuperação de senha',
                html: `<h2>Perdeu a senha?</h2
                    <p>Clique no link para recuperar</p>
                    <a href="http://localhost:3000/admin/password-reset?token=${token}" target="_blank">Nova Senha</a>`
            })

            return res.render("admin/session/forgot-password", {
                success: "Verifique seu email"
            })
        } catch (err) {
            console.error(err)
            res.render("admin/session/forgot-password", {
                error: "Erro inesperado, tente novamente."
            })
        }
    },
    resetForm(req, res) {
        try {
            return res.render("home/index")
        } catch (err) {
            console.error(err)
        }
    },
    async reset(req, res) {
        try {
            return res.render("home/index")
        } catch (err) {
            console.error(err)
        }
    }
}