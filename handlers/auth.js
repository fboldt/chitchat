import { confirmEmail, requestSignin } from '../controllers/auth.js'
import { checkCredentials } from '../controllers/users.js'

const handlers = {}

handlers.loginForm = (req, res) => res.render('login_form')

handlers.loginAction = (req, res) => {
    const { email, senha } = req.body
    const success = checkCredentials(email, senha)
    if (success) {
        req.session.username = email
    }
    res.render('login', { success })
}

handlers.logout = (req, res) => {
    if (req.session.username) {
        delete req.session.username
    }
    res.render('logout')
}

handlers.signinForm = (req, res) => res.render('signin_form')

handlers.signinAction = async (req, res) => {
    const { email, senha } = req.body
    const host = req.headers.host
    const { success, msg } = await requestSignin(email, senha, host)
    res.render('signin', { success, msg })
}

handlers.confirmEmail = (req, res) => {
    const cc = req.query.cc
    const success = confirmEmail(cc)
    res.render('confirmation', { success, layout: false })
}

export default handlers
