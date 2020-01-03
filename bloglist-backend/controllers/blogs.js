const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blogs = await Blog.find({ user: decodedToken.id }).populate('user')
  console.log(blogs)
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  body = request.body
  console.log(body)
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
      user: user._id
    })
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch (errors) {
    next(errors)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  const body = req.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, body, { new: true })
    res.json(updatedBlog)
  }
  catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id).populate('user')
    console.log(blog)
    if (blog.user._id.toString() === decodedToken.id) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
  }
  catch (error) {
    next(error)
  }
})

module.exports = blogRouter