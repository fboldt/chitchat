import express from 'express'
const router = express.Router()
import handlers from '../handlers/posts.js'

router.post('/insert', handlers.insertPost)

export default router
