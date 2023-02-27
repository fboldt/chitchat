import express from 'express'
const router = express.Router()
import { loginAction, signinAction, confirmEmail, logout } from '../controllers/auth.js'

router.get('/', (req, res) => res.render('login_form'))

router.post('/', loginAction)

router.get('/logout', logout)

router.get('/signin', (req, res) => res.render('signin_form'))

router.post('/signin', signinAction)

router.get('/confirm', confirmEmail)

export default router
