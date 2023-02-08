import { getQuote } from './quotes.js'
import { checkCredentials } from './auth.js'

const handlers = {}

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

handlers.loginAction = (req, res) => {
    const {email, senha} = req.body
    if (checkCredentials(email, senha)) {
        res.render('login_success')
    } else {
        res.render('login_fail')
    }
}

handlers.notFound = (req, res) => res.render('404')

handlers.serverError = (err, req, res, next) => {
    // console.error(err.message)
    res.render('500')
}

export default handlers
