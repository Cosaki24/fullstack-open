const logger = require('./logger')

const requestLogger = (request, response, next) => {
	const message = `${request.method} ${request.path} - ${JSON.stringify(
		request.body
	)}`
	logger.info(message)
	next()
}

module.exports = {
	requestLogger,
}
