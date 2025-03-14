const express = require('express')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')

mongoose.set('strictQuery', false)

logger.info('Connecting to MongoDB...')

mongoose
	.connect(config.MONGODB_URL)
	.then(() => {
		logger.info('Connected to MongoDB')
	})
	.catch((error) => {
		logger.error('Error connection to mongoDB: ', error.message)
	})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)


app.listen(PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})
