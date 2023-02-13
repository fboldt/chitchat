import express from 'express'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import { engine } from 'express-handlebars'
import path from 'path'
import * as url from 'node:url'
import { credentials } from './.credentials.js'
import handlers from './lib/handlers.js'
import { authMiddleware } from './lib/auth.js'

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

const __dirname = path.resolve();
app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({ extended: false }))

app.use(cookieParser(credentials.cookieSecret))
app.get('/bakecookie', handlers.bakeCookie)
app.get('/clearcookie', handlers.cleanCookie)

app.use(expressSession({ 
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
 }))
app.use(authMiddleware)

const port = process.env.PORT || 3000

app.get('/', handlers.home)

app.get('/sobre', handlers.sobre)

app.get('/login', handlers.loginForm)

app.post('/login', handlers.loginAction)

app.get('/logout', handlers.logout)

app.get('/signin', handlers.signinForm)

app.post('/signin', handlers.signinAction)

app.use(handlers.notFound)

app.use(handlers.serverError)

if (import.meta.url.startsWith('file:')) { 
    const modulePath = url.fileURLToPath(import.meta.url);
    if (process.argv[1] === modulePath) { 
        app.listen(port, () => console.log(`sevidor iniciado na porta ${port},` +
            ' pressione Ctrl+c para terminar...'))
    }
}

export default app
