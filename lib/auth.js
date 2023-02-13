import nodemailer from 'nodemailer'
import { credentials } from '../.credentials.js'

const mailTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    auth: {
        user: credentials.sendgrid.username,
        pass: credentials.sendgrid.password,
    }
})

function checkCredentials(email, senha) {
    return email == "alice" && senha == "123"
}

function loginAction (req, res) {
    const {email, senha} = req.body
    if (checkCredentials(email, senha)) {
        req.session.username = email
        res.render('login_success')
    } else {
        res.render('login_fail')
    }
}

async function signinAction (req, res) {
    const {email, senha} = req.body
    if (email && senha) {
        console.log(email, senha)
        try {
            const result = await mailTransport.sendMail({
                from: '"Professor Francisco" <franciscoa@ifes.edu.br>',
                to: email,
                subject: "Confirmação de cadastro",
                text: "Obrigado por se cadastrar na rede Papo Reto."
            })
            console.log('email enviado: ', result)
            res.render('signin_success')
        } catch (error) {
            console.log('falha no envio do email: ' + error.message)
            res.render('signin_fail')
        }
    } else {
        res.render('signin_fail')
    }
}

function authMiddleware(req, res, next) {
    res.locals.username = req.session.username
    next()
}

export { loginAction, signinAction, authMiddleware }
