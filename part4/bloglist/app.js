const express = require('express')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

const startServer = async () => {
	const MONGODB_URL = await config.loadDbConfig()
	if (MONGODB_URL) {
		logger.info(`Connecting to MongoDB at ${MONGODB_URL}`)
		try {
			await mongoose.connect(MONGODB_URL)
			logger.info(`Connected to MongoDB at ${MONGODB_URL}`)
			app.use(cors())
			app.use(express.json())
			app.use(middleware.requestLogger)
			app.use('/api/login', loginRouter)
			app.use('/api/blogs', blogRouter)
			app.use('/api/users', userRouter)
		} catch (error) {
			logger.error('Error connecting to mongoDB: ', error.message)
		}
	}
}

startServer().catch((error) => {
	logger.error('Unable to start server due to error: ', error)
	process.exit(1)
})

module.exports = app
