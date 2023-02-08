const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

morgan.token('content', function (req) {if (req.method === 'POST') return JSON.stringify(req.body) })

const mongoUrl = config.MONGODB_URI

logger.info('connecting to', mongoUrl)

mongoose.connect(mongoUrl).then(() => {
    logger.info('connected to MongoDB')
}).catch(error => {
    logger.error('error connection to MongoDB', error.message)
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content', 'skip'))
// app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app