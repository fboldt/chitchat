import nodemailer from 'nodemailer'
import { credentials } from '../.credentials.js'
import { saveUser } from './users.js'

const mailTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    auth: {
        user: credentials.sendgrid.username,
        pass: credentials.sendgrid.password,
    }
})

const confirmationCodes = {}

function checkCredentials(email, senha) {
    return email == "alice" && senha == "123"
}

function loginAction(req, res) {
    const { email, senha } = req.body
    if (checkCredentials(email, senha)) {
        req.session.username = email
        res.render('login_success')
    } else {
        res.render('login_fail')
    }
}

function logout(req, res) {
    if (req.session.username) {
        delete req.session.username
    }
    res.render('logout_success')
}

function generateConfirmartionCode() {
    return Math.floor(Math.random() * 8999) + 1000
}

async function signinAction(req, res) {
    const { email, senha } = req.body
    if (email && senha) {
        console.log(email, senha)
        try {
            const confirmationCode = generateConfirmartionCode()
            confirmationCodes[`${confirmationCode}`] = { email, senha }
            const link = `http://localhost:3000/confirm?cc=${confirmationCode}`
            //*
            const result = await mailTransport.sendMail({
                from: '"Professor Francisco" <franciscoa@ifes.edu.br>',
                to: email,
                subject: "Confirmação de cadastro",
                text: "Obrigado por se cadastrar na rede Papo Reto." +
                `Por favor, confirme seu cadastro pelo link: ${link}`
            })
            /*/
            const result = "não enviou de verdade: " + link
            //*/
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

function confirmEmail(req, res) {
    const cc = req.query.cc
    if (cc in confirmationCodes) {
        const { email, senha } = confirmationCodes[cc]
        saveUser(email, senha)
        res.render('confirmation_success')
    } else {
        res.render('confirmation_fail')
    }
}

function authMiddleware(req, res, next) {
    res.locals.username = req.session.username
    next()
}

export { loginAction, signinAction, authMiddleware, confirmEmail, logout }
