import { getQuoteSync } from '../controllers/quotes.js'
import { listPosts } from '../controllers/posts.js'

const handlers = {}

handlers.home = async (req, res) => {
    try {
        const quote = getQuoteSync()
        const posts = await listPosts()
        res.render('home', { quote, posts })
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
