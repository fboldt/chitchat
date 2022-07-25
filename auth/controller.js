
const login = async (req, res) => {
    const { username, password } = req.body
    if (username === 'alice' && password === '123') {
        return res.status(200).json({ username })
    }
    return res.status(401).json({ })
}

const logout = async (req, res) => { // logout
    return res.status(200).json({ })
}

module.exports = {
    login,
    logout,
}
