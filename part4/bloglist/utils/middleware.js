const logger = require('./logger')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./secrets')

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

const userExtractor = (request, response, next) => {
	if(request.token){
		request.user = jwt.verify(request.token, JWT_SECRET)
	}

	next ()
}

module.exports = {
	requestLogger,
	tokenExtractor,
	userExtractor,
}
