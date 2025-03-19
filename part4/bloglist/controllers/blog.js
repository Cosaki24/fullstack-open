const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
	const result = await Blog.find({})
	return response.json(result)
})

blogRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)

	const result = await blog.save()
	return response.status(201).json(result)
})

module.exports = blogRouter
