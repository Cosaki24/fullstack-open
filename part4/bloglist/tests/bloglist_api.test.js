const { test, after } = require('node:test')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)


test.only('mongomemory works', async () => {
	await api.get('/api/blogs/').expect(404)

})

after(async () => {
	await mongoose.connection.close()
})
