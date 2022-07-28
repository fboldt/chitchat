require('dotenv').config();

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authenticate = require('./auth/middleware')

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const authRoutes = require('./auth/routes')
app.use('/login', authRoutes)
const userRoutes = require('./user/routes')
app.use('/user', userRoutes)
const quoteRoutes = require('./quote/routes')
app.use('/quote', authenticate, quoteRoutes)
const postsRoutes = require('./post/routes')
app.use('/post', postsRoutes)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};
start()
