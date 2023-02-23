import nodemailer from 'nodemailer'
import { credentials } from '../.credentials.js'
import { saveUser, checkUser } from './users.js'

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
    const success = checkCredentials(email, senha)
    if (success) {
        req.session.username = email
    }
    res.render('login', { success })
}

function logout(req, res) {
    if (req.session.username) {
        delete req.session.username
    }
    res.render('logout')
}

function generateConfirmartionCode() {
    return Math.floor(Math.random() * 8999) + 1000
}

async function signinAction(req, res) {
    const { email, senha } = req.body
    const success = (email && senha)
    if (success) {
        const userExists = checkUser(email)
        if (userExists) {
            return res.render('signin', { success: false, msg: "Usuário já existe!" })
        }
        try {
            const confirmationCode = generateConfirmartionCode()
            confirmationCodes[`${confirmationCode}`] = { email, senha }
            const link = `http://localhost:3000/confirm?cc=${confirmationCode}`
            /*
            const result = await mailTransport.sendMail({
                from: '"Professor Francisco" <franciscoa@ifes.edu.br>',
                to: email,
                subject: "Papo Reto - Confirmação de cadastro",
                text: "Obrigado por se cadastrar na rede Papo Reto." +
                `Por favor, confirme seu cadastro pelo link: ${link}`
            })
            /*/
            const result = "não enviou de verdade: " + link
            //*/
            console.log('email enviado: ', result)
        } catch (error) {
            console.log('falha no envio do email: ' + error.message)
            return res.render('signin', { success: false, msg: "Falha no servidor!" })
        }
    }
    res.render('signin', { success })
}

function confirmEmail(req, res) {
    const cc = req.query.cc
    let success = cc in confirmationCodes
    if (success) {
        const { email, senha } = confirmationCodes[cc]
        success = saveUser(email, senha)
    }
    res.render('confirmation', { success, layout: false })
}

function authMiddleware(req, res, next) {
    res.locals.username = req.session.username
    next()
}

export { loginAction, signinAction, authMiddleware, confirmEmail, logout }
