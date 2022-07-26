const { StatusCodes } = require('http-status-codes')
const User = require('../user/model')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ "error": "Provide username and password" })
    }

    const user = await User.findOne({ username })
    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ "error": "Invalid credentials" })
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ "error": "Invalid credentials" })
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME })
    return res.status(StatusCodes.OK).json({ username, token })
}

const logout = async (req, res) => {
    return res.status(StatusCodes.OK).json({ username: null, token: null })
}

module.exports = {
    login,
    logout,
}
