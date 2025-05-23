const logger = require('./logger')

const requestLogger = (request, response, next) => {
	const message = `${request.method} ${request.path}`
	logger.info(message)
	next()
}

module.exports = {
	requestLogger,
}
