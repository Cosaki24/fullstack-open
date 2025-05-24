const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
	console.log('deleting all users')
	await User.deleteMany({})
	console.log('all users deleted')
})

test('An existing user can login with correct password', async () => {
	const user = {
		name: 'Collins Kipepe',
		username: 'Collins',
		password: 'csk',
		blogs: [],
	}
	await api
		.post('/api/users/')
		.send(user)
		.expect(201)
		.expect('Content-Type', /json/)

	const loginCredentials = { username: 'Collins', password: 'csk' }

	const response = await api
		.post('/api/login/')
		.send(loginCredentials)
		.expect(200)
		.expect('Content-Type', /json/)

	assert(Object.prototype.hasOwnProperty.call(response.body, 'token'))
	assert.strictEqual(response.body.username, loginCredentials.username)
})

test('Signing in with incorrect password should fail', async () => {
	const user = {
		name: 'Collins Kipepe',
		username: 'Collins',
		password: 'csk',
		blogs: [],
	}
	await api
		.post('/api/users/')
		.send(user)
		.expect(201)
		.expect('Content-Type', /json/)

	const loginCredentials = { username: 'Collins', password: 'csa' }

	const response = await api
		.post('/api/login/')
		.send(loginCredentials)
		.expect(401)
		.expect('Content-Type', /json/)

	assert(Object.prototype.hasOwnProperty.call(response.body, 'error'))
	assert.strictEqual(response.body.error, 'Unauthorized')
	assert.strictEqual(response.body.message, 'Invalid username or password')
})

after(async () => {
	console.log('closing connection...')
	await mongoose.connection.close()
	console.log('closed')
})
