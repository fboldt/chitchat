import express from 'express'
const router = express.Router()
import handlers from '../handlers/auth.js'

router.get('/', handlers.loginForm)

router.post('/', handlers.loginAction)

router.get('/logout', handlers.logout)

router.get('/signin', handlers.signinForm)

router.post('/signin', handlers.signinAction)

router.get('/confirm', handlers.confirmEmail)

export default router
