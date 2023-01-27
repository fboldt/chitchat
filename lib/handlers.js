import { getQuote } from './quotes.js';

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

handlers.notFound = (req, res) => res.render('404')

handlers.serverError = (err, req, res, next) => {
    // console.error(err.message)
    res.render('500')
}

export default handlers
