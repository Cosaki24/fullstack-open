const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
	const result = await Blog.find({}).populate('user', { name: 1, username: 1 })
	return response.json(result)
})

blogRouter.post('/', async (request, response) => {
	const blogCreator = await User.findOne()
	if (!blogCreator) {
		return response
			.status(400)
			.json({ error: 'No user found. At least one user must exist to create a blog' })
	}

	const body = request.body

	const blog = new Blog({
		title: body.title,
		author: body.author,
		likes: body.likes,
		url: body.url,
		user: blogCreator._id,
	})

	try {
		const result = await blog.save()
		blogCreator.blogs = blogCreator.blogs.concat(result._id) // insert the blog id to the array of blogs owned by the user
		await blogCreator.save() // save it back to the database
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
		const result = await Blog.findByIdAndDelete(id)
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

blogRouter.put('/:id', async (request, response) => {
	try {
		const id = request.params.id
		const { title, url, author, likes } = request.body
		const result = await Blog.findByIdAndUpdate(
			id,
			{ title, url, author, likes },
			{ new: true, runValidators: true, context: 'query' }
		)
		return response.json(result)
	} catch (error) {
		if (error.name === 'ValidationError') {
			return response.status(400).json({ error: 'title or url is missing' })
		}
	}
})

module.exports = blogRouter
