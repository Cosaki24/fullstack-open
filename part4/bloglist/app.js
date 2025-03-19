const express = require('express')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')

mongoose.set('strictQuery', false)

const startServer = async () => {
	const MONGODB_URL = await config.loadDbConfig()

	if (MONGODB_URL) {
		logger.info(`Connecting to MongoDB at ${MONGODB_URL}`)

		mongoose
			.connect(MONGODB_URL)
			.then(() => {
				logger.info(`Connected to MongoDB at ${MONGODB_URL}`)
			})
			.catch((error) => {
				logger.error('Error connection to mongoDB: ', error.message)
			})

		app.use(cors())
		app.use(express.json())
		app.use(middleware.requestLogger)
		app.use('/api/blogs', blogRouter)
	}
}

startServer().catch((error) => {
	logger.error('Unable to start server due to error: ', error)
	process.exit(1)
})

module.exports = app
