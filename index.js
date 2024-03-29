import express from 'express'
import expressSession from 'express-session'
import { engine } from 'express-handlebars'
import path from 'path'
import * as url from 'node:url'
import basicHandlers from './handlers/basic.js'
import basicRoutes from './routes/basic.js'
import { getSessionUser } from './middlewares/auth.js'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

const __dirname = path.resolve();
app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({ extended: false }))

app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
}))
app.use(getSessionUser)

app.use('/', basicRoutes)

app.use('/login', authRoutes)

app.use('/post', postRoutes)

app.use(basicHandlers.notFound)
app.use(basicHandlers.serverError)

const port = process.env.PORT || 3000
if (import.meta.url.startsWith('file:')) {
    const modulePath = url.fileURLToPath(import.meta.url);
    if (process.argv[1] === modulePath) {
        const server = app.listen(port, () => {
            let serverAddress = server.address().address
            if (serverAddress == "::" || serverAddress == "127.0.0.1") {
                serverAddress = "localhost"
            }
            console.log(process.env.NODE_ENV)
            console.log(`sevidor iniciado em http://${serverAddress}:${port},` +
                ' pressione Ctrl+c para terminar...')
        })
    }
}

export default app
