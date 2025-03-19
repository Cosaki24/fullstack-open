const blogRouter = require('express').Router()
const blog = require('../models/blog')
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

blogRouter.delete('/:id', async (request, response) => {
	try {
		const id = request.params.id
		const result = await blog.findByIdAndDelete(id)
		if (!result) {
			return response.status(204).end()
		}
		return response
			.status(200)
			.json({ message: `a blog with id ${result._id} has been deleted` })
	} catch (error) {
		if (error.name === 'CastError') {
			return response.status(400).json({ error: 'bad id' })
		}
	}
})

module.exports = blogRouter
