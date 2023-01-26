import http from 'http'
import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();
const port = process.env.PORT || 3000

function serveStaticFile(res, path, contentType, responseCode = 200) {
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode, { 'Content-Type': contentType })
        res.end(data)
    })
}

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch (path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html')
            break
        case '/sobre':
            serveStaticFile(res, '/public/sobre.html', 'text/html')
            break
        case '/img/logo.png':
            serveStaticFile(res, '/public/img/logo.png', 'image/png')
            break
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404)
            break
    }
})


server.listen(port, () => console.log(`sevidor iniciado na porta ${port},` +
    ' pressione Ctrl+c para terminar...'))
