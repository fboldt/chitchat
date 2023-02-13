function checkCredentials(email, senha) {
    return email == "alice" && senha == "123"
}

function loginAction (req, res) {
    const {email, senha} = req.body
    if (checkCredentials(email, senha)) {
        req.session.username = email
        res.render('login_success')
    } else {
        res.render('login_fail')
    }
}

function authMiddleware(req, res, next) {
    res.locals.username = req.session.username
    next()
}

export { loginAction, authMiddleware }
