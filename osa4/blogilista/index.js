const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')



const blogsRouter = require('./controllers/blogs')

morgan.token('content', function (req) {if (req.method === 'POST') return JSON.stringify(req.body) })


if (process.argv.length<3) {
  logger.info('give password as argument')
  process.exit(1)
}


const password = process.argv[2]
const mongoUrl = `mongodb+srv://fullstov:${password}@cluster0.lyzds4f.mongodb.net/bloglist?retryWrites=true&w=majority`

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

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})