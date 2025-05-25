const logger = require('./logger')

const requestLogger = (request, response, next) => {
	const message = `${request.method} ${request.path}`
	logger.info(message)
	next()
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		request.token = authorization.replace('Bearer ', '')
	}

	next()
}

module.exports = {
	requestLogger,
	tokenExtractor
}
