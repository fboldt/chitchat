import { insertPost, deletePost } from '../controllers/posts.js'
import basicHandlers from './basic.js'

const handlers = {}

handlers.insertPost = async (req, res) => {
    const { email, text } = req.body
    await insertPost(email, text)
    basicHandlers.home(req, res)
}

handlers.deletePost = async (req, res) => {
    const user = res.locals.username
    const id = req.query.id
    await deletePost(user, id)
    basicHandlers.home(req, res)
}

export default handlers
