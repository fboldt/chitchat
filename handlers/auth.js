import { confirmEmail, requestSignin } from '../controllers/auth.js'
import { checkCredentials } from '../controllers/users.js'

const handlers = {}

handlers.loginForm = (req, res) => res.render('login')

handlers.loginAction = async (req, res) => {
    const { email, senha } = req.body
    const success = await checkCredentials(email, senha)
    if (success) {
        req.session.username = email
        res.redirect('/')
    } else {
        res.render('loginfail')
    }
}

handlers.logout = (req, res) => {
    if (req.session.username) {
        delete req.session.username
    }
    res.redirect('/')
}

handlers.signinForm = (req, res) => res.render('signin_form')

handlers.signinAction = async (req, res) => {
    const { email, senha } = req.body
    const host = req.headers.host
    const { success, msg } = await requestSignin(email, senha, host)
    res.render('signin', { success, msg })
}

handlers.confirmEmail = async (req, res) => {
    const cc = req.query.cc
    const success = await confirmEmail(cc)
    res.render('confirmation', { success, layout: false })
}

export default handlers
