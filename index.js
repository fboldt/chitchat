import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path';
import handlers from './lib/handlers.js';

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

const __dirname = path.resolve();
app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

app.get('/', handlers.home)

app.get('/sobre', handlers.sobre)

app.use(handlers.notFound)

app.use(handlers.serverError)

app.listen(port, () => console.log(`sevidor iniciado na porta ${port},` +
    ' pressione Ctrl+c para terminar...'))
