/* global require */
const express = require('express')
const cors = require('cors')

const Person = require('./models/person')
require('dotenv').config()
const bodyParser = require('body-parser')
const morgan = require('morgan')
morgan('tiny')
const app = express()

const reqLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(bodyParser.json())
app.use(express.static('build'))

app.use(cors())
// app.use(reqLogger)


const isExistPerson = (newPerson) => {
  Person.find({name: newPerson.name}).then(persons => {
    if(persons.length > 0){
      return true;
    }
  })
  return false;
}

const checkMissingErrors = (req, res, next) => {
  const body = req.body
  if (!body) {
    return 'Content missing'
  } else if (!body.name || !body.number) {
    return 'The name or number is missing'
  } else if (isExistPerson(body)) {
    return 'Name must be unique'
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.get('/api/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/info', (req, res) => {
  let result = `<h1>Phone book has info for ${persons.length}</h1>`;
  result += `<div>${new Date()}</>`
  res.send(result)
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  console.log(body)
  app.use(checkMissingErrors)
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  console.log(req.params.id)
  app.use(checkMissingErrors)

  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: false }).then(updatedPerson => {
    res.json(updatedPerson)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    res.json(person.toJSON())
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
  .then(deletedPerson => 
    res.json(deletedPerson.toJSON())
  )
  .catch(error => next(error))
})

app.use(unknownEndpoint)

app.disable('etag')
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
