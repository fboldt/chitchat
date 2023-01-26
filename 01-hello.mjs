import http from 'http'
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '')
    switch (path) {
        case '':
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('Papo Reto')
            break
        case '/sobre':
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('Sobre')
            break
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('Nada aqui')
            break
    }
})

server.listen(port, () => console.log(`sevidor iniciado na porta ${port},` +
    ' pressione Ctrl+c para terminar...'))
