const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    let user = new User({
      username: body.username,
      name: body.name,
      passwordHash
      // password: body.password,
    })

    user.validate()
    // const passwordHash = await bcrypt.hash(body.password, saltRounds)
    // user.password = passwordHash
    const savedUser = await user.save({ validateBeforeSave: false })

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('persons', { name: 1, number: 1 })
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
