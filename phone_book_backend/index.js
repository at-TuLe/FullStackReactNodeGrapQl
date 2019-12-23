const express = require('express')
const Person = require('./models/person')
require('dotenv').config()
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
app.use(express.static('build'))
// app.use(requestLogger)


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

app.get('/api/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/info', (req, res) => {
  let result = `<h1>Phone book has info for ${persons.length}</h1>`;
  result += `<div>${new Date()}</>`
  res.send(result)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    response.json(persons.toJSON())
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.content === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person.toJSON())
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

app.use(unknownEndpoint)

app.disable('etag')
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
