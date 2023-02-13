import { getQuote } from './quotes.js'
import { loginAction } from './auth.js'

const handlers = {}

handlers.bakeCookie = (req, res) => {
    res.cookie('monster', 'nom nom')
    res.end('cookie done')
}

handlers.cleanCookie = (req, res) => {
    res.clearCookie('monster')
    res.end('cookie cleaned')
}

async function waitForQuote() {
    return new Promise((resolve, reject) => {
        getQuote((err, data) => {
            if (err) {
                res.status(500).render('500')
            }
            resolve(data)
        })
    })
}

handlers.home = async (req, res) => {
    const data = await waitForQuote()
    res.render('home', { quote: data })
}

handlers.sobre = (req, res) => res.render('sobre')

handlers.loginForm = (req, res) => res.render('login_form')

handlers.loginAction = loginAction

handlers.logout = (req, res) => {
    if(req.session.username) {
        delete req.session.username
    }
    res.render('logout_success')
}

handlers.notFound = (req, res) => res.render('404')

handlers.serverError = (err, req, res, next) => {
    // console.error(err.message)
    res.render('500')
}

export default handlers
