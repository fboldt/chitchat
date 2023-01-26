import express from 'express'
const app = express()
const port = process.env.PORT || 3000

app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Não encontrado')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Erro no Servidor')
})

app.listen(port, () => console.log(`sevidor iniciado na porta ${port},` +
    ' pressione Ctrl+c para terminar...'))
