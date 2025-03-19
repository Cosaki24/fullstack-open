const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
	const result = await Blog.find({})
	return response.json(result)
})

blogRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)

	try {
		const result = await blog.save()
		return response.status(201).json(result)
	} catch (error) {
		if (error.name === 'ValidationError') {
			return response.status(400).json({ error: error.message })
		}
	}
})

module.exports = blogRouter
