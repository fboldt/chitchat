import { saveUser, checkUser } from './users.js'
import { sendMail } from './mailer.js'
import dotenv from 'dotenv'
dotenv.config()

const confirmationCodes = {}

function generateConfirmartionCode() {
    return Math.floor(Math.random() * 8999) + 1000
}

function generateConfirmationLink(email, senha, host) {
    const confirmationCode = generateConfirmartionCode()
    confirmationCodes[`${confirmationCode}`] = { email, senha }
    return `http://${host}/login/confirm?cc=${confirmationCode}`
}

async function sendConfimationEmail(email, link) {
    const content = {
        from: '"Professor Francisco" <franciscoa@ifes.edu.br>',
        to: email,
        subject: "Papo Reto - Confirmação de cadastro",
        text: "Obrigado por se cadastrar na rede Papo Reto." +
            `Por favor, confirme seu cadastro pelo link: ${link}`
    }
    let emailMsg
    if (process.env.NODE_ENV == "development") {
        emailMsg = `(não enviou de verdade) ` + JSON.stringify(content)
    } else {
        emailMsg = await sendMail(content)
    }
    return emailMsg
}

async function requestSignin(email, senha, host) {
    const success = (email && senha)
    let result = { success: false, msg: "Falta usuário ou senha." }
    if (success) {
        const userExists = checkUser(email)
        if (userExists) {
            result = { success: false, msg: "Usuário já existe!" }
        }
        try {
            const link = generateConfirmationLink(email, senha, host)
            const emailMsg = await sendConfimationEmail(email, link)
            console.log('email enviado: ', emailMsg)
            result = { success: true, msg: "Solicitação de cadastro iniciada com sucesso." }
        } catch (error) {
            console.log('falha no envio do email: ' + error.message)
            result = { success: false, msg: "Falha no servidor!" }
        }
    }
    return result
}

function confirmEmail(cc) {
    let success = cc in confirmationCodes
    if (success) {
        const { email, senha } = confirmationCodes[cc]
        success = saveUser(email, senha)
    }
    return success
}

export { requestSignin, confirmEmail }
