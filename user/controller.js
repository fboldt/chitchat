const { StatusCodes } = require('http-status-codes')
const User = require('./model')

const signin = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ "username": user.username, token })
}

module.exports = {
    signin,
}
