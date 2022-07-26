const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body
    if (username === 'alice' && password === '123') {
        const token = jwt.sign({ username }, process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_LIFETIME })
        return res.status(StatusCodes.OK).json({ username, token })
    }
    return res.status(StatusCodes.FORBIDDEN).json({})
}

const logout = async (req, res) => { 
    return res.status(StatusCodes.OK).json({ username: null, token: null })
}

module.exports = {
    login,
    logout,
}
