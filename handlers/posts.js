import { insertPost } from '../controllers/posts.js'
import basicHandlers from './basic.js'

const handlers = {}

handlers.insertPost = async (req, res) => {
    const { email, text } = req.body
    await insertPost(email, text)
    basicHandlers.home(req, res)
}

export default handlers
