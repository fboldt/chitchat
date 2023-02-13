export default (req, res, next) => {
    res.locals.username = req.session.username
    next()
}