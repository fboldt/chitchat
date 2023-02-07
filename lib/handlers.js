import { getQuote } from './quotes.js'
import { checkLogin } from './auth.js'

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

handlers.home = (req, res) => {
    res.render('home')
}

handlers.sobre = (req, res) => res.render('sobre')


handlers.login = async (req, res) => {
    const { email, senha } = req.body
    if (checkLogin(email, senha)) {
        const data = await waitForQuote()
        res.render('feed', { quote: data })
    } else {
        res.render('loginfail')
    }
}

handlers.notFound = (req, res) => res.render('404')

handlers.serverError = (err, req, res, next) => {
    // console.error(err.message)
    res.render('500')
}

export default handlers
