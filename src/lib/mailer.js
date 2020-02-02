const nodemailer = require('nodemailer')

module.exports = transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "89a356d1e371a1",
        pass: "9d5b18b8324095"
    }
})
