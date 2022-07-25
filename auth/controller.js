
const login = async (req, res) => {
    const { username, password } = req.body
    if (username === 'alice' && password === '123') {
        return res.status(200).json({ "username": username })
    }
    return res.status(401).json({ "username": "" })
}

const logout = async (req, res) => { // logout
    return res.status(200).redirect('/')
}

module.exports = {
    login,
    logout,
}
