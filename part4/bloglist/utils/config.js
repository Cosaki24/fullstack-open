require('dotenv').config()
const logger = require('./logger')
const mongoClient = require('mongodb-memory-server')

const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET
let db

const initializeDB = async () => {
	if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
		try {
			db = new mongoClient.MongoMemoryServer({
				instance: {
					dbName: 'bloglist'
				}
			})
			await db.ensureInstance()
			logger.info('In-memory-db initialized at ', db.getUri())
			return db.getUri()
		} catch (error) {
			logger.error('Unable to initialize in memory db: ', error)
		}
	} else {
		return process.env.MONGODB_URL
	}

}

const loadDbConfig = async() => {
	return await initializeDB()
}

module.exports = {
	loadDbConfig,
	PORT,
	db,
	JWT_SECRET
}
