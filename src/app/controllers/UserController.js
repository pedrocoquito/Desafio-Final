const { hash } = require('bcryptjs')
const { unlinkSync } = require('fs')

const User = require('../models/User')
const Recipe = require('../models/Recipe')
const LoadReceiptsService = require('../services/LoadReceiptsService')


module.exports = {
    registerForm(req, res) {
        return res.render("user/register")
    },
    async show(req, res) {
        try {
            const { user } = req

            user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
            user.cep = formatCep(user.cep)

            return res.render('user/index', { user })
        } catch (err) {
            console.error(err)
        }
    },
    async post(req, res) {
        try {
            let { name, email, password } = req.body

            password = await hash(password, 8)

            const userId = await User.create({
                name,
                email,
                password
            })

            req.session.userId = userId

            return res.redirect('/')
        } catch (err) {
            console.error(err)
        }
    },
    async update(req, res) {
        try {
            const { user } = req
            let { name, email, cep, cpf_cnpj, address } = req.body
            cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            cep = cep.replace(/\D/g, "")

            await User.update(user.id, {
                name,
                cep,
                cpf_cnpj,
                address,
                email
            })

            return res.render("user/index", {
                user: req.body,
                success: "Conta atualizada com sucesso"
            })
        } catch (err) {
            console.error(err)
            return res.render("user/index", {
                error: "Algum erro aconteceu!"
            })
        }
    },
    async delete(req, res) {
        try {
            const products = await Product.findAll({ where: { user_id: req.body.id } })

            const allFilesPromisse = products.map(product =>
                Product.files(Product.id))

            let promisseResults = await Promise.all(allFilesPromisse)

            await User.delete(req.body.id)
            req.session.destroy()

            promisseResults.map(files => {
                files.map(file => {
                    try {
                        unlinkSync(file.path)
                    } catch (err) {
                        console.error(err)
                    }
                })
            })

            return res.render("session/login", {
                success: "Conta removida com sucesso!"
            })
        } catch (err) {
            console.error(err)
            return res.render("user/index", {
                user: req.body,
                error: "Erro ao deletar sua conta."
            })
        }
    },
    async ads(req, res) {
        const products = await LoadReceiptsService.load('receipts', {
            where: { user_id: req.session.userId }
        })

        return res.render("user/ads", { products })
    }
}