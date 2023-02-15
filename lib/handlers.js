import { waitForQuote } from './quotes.js'
import { loginAction, signinAction, confirmEmail, logout } from './auth.js'

const handlers = {}

handlers.bakeCookie = (req, res) => {
    res.cookie('monster', 'nom nom')
    res.end('cookie done')
}

handlers.cleanCookie = (req, res) => {
    res.clearCookie('monster')
    res.end('cookie cleaned')
}

handlers.home = async (req, res) => {
    try {
        const data = await waitForQuote()
        res.render('home', { quote: data })
    } catch (error) {
        res.status(500).render('500')
    }
}

handlers.sobre = (req, res) => res.render('sobre')

handlers.loginForm = (req, res) => res.render('login_form')

handlers.loginAction = loginAction

handlers.logout = logout

handlers.signinForm = (req, res) => res.render('signin_form')

handlers.signinAction = signinAction

handlers.confirmEmail = confirmEmail

handlers.notFound = (req, res) => res.render('404')

handlers.serverError = (err, req, res, next) => {
    // console.error(err.message)
    res.render('500')
}

export default handlers
