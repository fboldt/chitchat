import express from 'express'
const router = express.Router()
import authHandlers from '../handlers/auth.js'

router.get('/', authHandlers.loginForm)

router.post('/', authHandlers.loginAction)

router.get('/logout', authHandlers.logout)

router.get('/signin', authHandlers.signinForm)

router.post('/signin', authHandlers.signinAction)

router.get('/confirm', authHandlers.confirmEmail)

export default router
