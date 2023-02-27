import nodemailer from 'nodemailer'
import { saveUser, checkUser, checkCredentials } from '../models/users.js'
import dotenv from 'dotenv'
dotenv.config()

const mailTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
    }
})

const confirmationCodes = {}

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
            const host = req.headers.host
            const link = `http://${host}/login/confirm?cc=${confirmationCode}`
            //*
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

export { loginAction, signinAction, confirmEmail, logout }
