const express = require('express')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Blog = mongoose.model('Blog', blogSchema)
logger.info('Connecting to MongoDB...')
mongoose
	.connect(config.MONGODB_URL)
	.then(() => {
		logger.info('Connected')
	})
	.catch((error) => {
		logger.error(error)
	})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/api/blogs', (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs)
	})
})

app.post('/api/blogs', (request, response) => {
	const blog = new Blog(request.body)

	blog.save().then((result) => {
		response.status(201).json(result)
	})
})

const PORT = config.PORT
app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`)
})
