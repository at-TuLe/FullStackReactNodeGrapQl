/* global require */
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(bodyParser.json())
app.use(express.static('build'))
app.use(cors())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
