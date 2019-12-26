/* global require */
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const personsRouter = require('./controllers/persons')
const usersRouter = require('./controllers/users')
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

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(cors())
app.use('/api/persons', personsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.requestLogger)
app.use(unknownEndpoint)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
