const express = require('express')
const router = express.Router();

router.post('/', (req, res) => { // login
    const { username, password } = req.body
    if (username === 'alice' && password === '123') {
        return res.status(200).json({ "username": username })
    }
    return res.status(401).json({ "username": "" })
})

router.get('/', (req, res) => { // logout
    return res.status(200).redirect('/')
})

module.exports = router
