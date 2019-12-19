const express = require('express')
// import express from 'express'
const bodyParser = require('body-parser')
const morgan = require('morgan')
morgan('tiny')
const app = express()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(bodyParser.json())
// app.use(requestLogger)
// app.use(unknownEndpoint)


let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "TTTTTTTTTTTT",
    "number": "09999999",
    "id": 5
  }
]

const isExistPerson = (newPerson) => {
  persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
}

const getMissingErrors = (person) => {
  if (!person) {
    return 'Content missing'
  } else if (!person.name || !person.number) {
    return 'The name or number is missing'
  } else if (isExistPerson(person)) {
    return 'Name must be unique'
  }
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  let result = `<h1>Phone book has info for ${persons.length}</h1>`;
  result += `<div>${new Date()}</>`
  res.send(result)
})

app.get('/persons', (req, res) => {
  morgan(':method :url :status :res[content-length] - :response-time ms')
  app.use(morgan);
  res.json(persons)
})

app.post('/persons', (req, res) => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(n => n.id)) 
  : 0

  const person = req.body
  const errors = getMissingErrors(person)
  if (!!errors) {
    return response.status(400).json({ 
      error: errors 
    })
  }
  person.id = maxId + 1
  persons = persons.concat(person)

  res.json(person)
})

app.get('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find(note => note.id === id)
  if (note) {
      response.json(note)
    } else {
      response.status(404).end()
  }
})

app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

app.disable('etag')
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
