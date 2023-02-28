import { getQuoteSync } from '../controllers/quotes.js'

const handlers = {}

handlers.home = async (req, res) => {
    try {
        const data = await getQuoteSync()
        res.render('home', { quote: data })
    } catch (error) {
        res.status(500).render('500')
    }
}

handlers.sobre = (req, res) => res.render('sobre')

handlers.notFound = (req, res) => res.render('404')

handlers.serverError = (err, req, res, next) => {
    // console.error(err.message)
    res.render('500')
}

export default handlers
