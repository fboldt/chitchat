import express from 'express'
const router = express.Router()
import basicHandlers from '../handlers/basic.js'

router.get('/', basicHandlers.home)

router.get('/sobre', basicHandlers.sobre)

export default router
