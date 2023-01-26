import express from 'express'
import { engine } from 'express-handlebars'
import path from 'path';
import { getQuote } from './lib/quotes.mjs';

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

const __dirname = path.resolve();
app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.render('home', { quote: getQuote() })
})

app.get('/sobre', (req, res) => res.render('sobre'))

app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(`sevidor iniciado na porta ${port},` +
    ' pressione Ctrl+c para terminar...'))
