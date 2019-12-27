const personsRouter = require('express').Router()
const Person = require('../models/person')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

personsRouter.get('/', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  }).catch(error => next(error))
})

personsRouter.post('/', async (req, res, next) => {
  const body = req.body
  const token = getTokenFrom(req)

  try{
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const person = new Person({
      name: body.name,
      number: body.number,
      user: user._id
    })
    const savedPerson = await person.save()
    user.persons = user.persons.concat(savedPerson._id)
    await user.save()
    res.json(savedPerson.toJSON()) 
  }
  catch(error) {
    next(error)
  }
})

personsRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: false }).then(updatedPerson => {
    res.json(updatedPerson)
  }).catch(error => next(error))
})

personsRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    res.json(person.toJSON())
  }).catch(error => next(error))
})

personsRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(deletedPerson =>
      res.json(deletedPerson.toJSON())
    )
    .catch(error => next(error))
})

module.exports = personsRouter
