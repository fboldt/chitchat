import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path';
import * as url from 'node:url';
import handlers from './lib/handlers.js';

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

const __dirname = path.resolve();
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 3000

app.get('/', handlers.home)

app.get('/sobre', handlers.sobre)

app.post('/login', handlers.login)

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
