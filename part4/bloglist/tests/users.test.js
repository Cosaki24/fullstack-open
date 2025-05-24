const { describe, beforeEach, after, test } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')

console.log('entering test...')
const api = supertest(app)

const userList = [
	{
		name: 'Collins Kipepe',
		username: 'cosaki',
		password: 'cosaki',
		blogs: [],
	},
	{
		name: 'Collins Kipepe',
		username: 'cosaki',
		password: 'cosaki2',
		blogs: [],
	},
	{
		name: 'John Doe',
		username: 'johndoe',
		password: 'jondoe',
		blogs: [],
	},
]

beforeEach(async () => {
	console.log('deleting all users')
	await User.deleteMany({})
	console.log('all users deleted')
})

describe('When no user exists', async () => {
	test('getting users should return no users', async () => {
		await api.get('/api/users/').expect(404).expect('Content-Type', /json/)
	})

	test('adding a user returns 201Created', async () => {
		const userToAdd = userList[0]
		await api
			.post('/api/users/')
			.send(userToAdd)
			.expect(201)
			.expect('Content-Type', /json/)
	})

	test('adding a user returns a user object with no password', async () => {
		const userToAdd = userList[0]
		const response = await api
			.post('/api/users/')
			.send(userToAdd)
			.expect('Content-Type', /json/)

		assert(Object.prototype.hasOwnProperty.call(response.body, 'id'))
		assert.strictEqual(response.body.name, userToAdd.name)
		assert(!Object.prototype.hasOwnProperty.call(response.body, 'passwordHash'))
	})
})

describe('When one or more users exists', async () => {
	test('/api/users should return 200 OK', async () => {
		const dataToSend = userList[0]
		await api.post('/api/users').send(dataToSend)
		await api.get('/api/users').expect(200).expect('Content-Type', /json/)
	})
})

describe('Creating a new user', async () => {
	test('with no username should return 400 bad request', async () => {
		const userWithNoUsername = {
			name: 'Collins Kipepe',
			username: '',
			password: 'johndoe',
			blogs: [],
		}

		const response = await api
			.post('/api/users')
			.send(userWithNoUsername)
			.expect(400)
			.expect('Content-Type', /json/)

		assert.strictEqual(response.body.error, 'ValidationError')
		assert(response.body.message.includes('username'))
	})

	test('with a username less than 3 characters should return 400 bad request', async () => {
		const userWithShortUsername = {
			name: 'Collins Kipepe',
			username: 'ck',
			password: 'jajajaja',
			blogs: [],
		}

		const response = await api
			.post('/api/users')
			.send(userWithShortUsername)
			.expect(400)
			.expect('Content-Type', /json/)

		assert.strictEqual(response.body.error, 'ValidationError')
		assert(
			response.body.message.includes(
				`${userWithShortUsername.username} is too short`
			)
		)
	})

	test('with an existing username should return 400 bad request', async () => {
		const user = {
			name: 'Collins Kipepe',
			username: 'Cosaki',
			password: 'jajajajaja',
			blogs: [],
		}

		const parody = {
			name: 'Collins Kipepe Jr',
			username: 'Cosaki',
			password: 'jajajajaja',
		}

		await api
			.post('/api/users')
			.send(user)
			.expect(201)
			.expect('Content-Type', /json/)

		const response = await api
			.post('/api/users')
			.send(parody)
			.expect(400)
			.expect('Content-Type', /json/)

		assert.strictEqual(response.body.error, 'DuplicateKeyError')
		assert.strictEqual(response.body.message, 'Username already exists')
	})

	test('without a password should return 400 bad request', async () => {
		const userWithNoPassword = {
			name: 'Collins Kipepe',
			password: '',
			username: 'csk',
			blogs: [],
		}

		const response = await api
			.post('/api/users')
			.send(userWithNoPassword)
			.expect(400)
			.expect('Content-Type', /json/)

		assert.strictEqual(response.body.error, 'ValidationError') // not Mongoose ValidationError
		assert.strictEqual(response.body.message, 'Password is required')
	})

	test('with a short password should return 400 bad request', async () => {
		const userWithShortPassword = {
			name: 'Collins Kipepe',
			username: 'csk',
			password: 'ja',
			blogs: [],
		}

		const response = await api
			.post('/api/users')
			.send(userWithShortPassword)
			.expect(400)
			.expect('Content-Type', /json/)

		assert.strictEqual(response.body.error, 'ValidationError')
		assert(response.body.message.includes('Password too short'))
	})
})

describe('When blogs exist', async () => {
	test('retrieving users, should return with the blogs they created', async() => {
		// creating a user
		await api.post('/api/users').send(userList[0]).expect(201).expect('Content-Type', /json/)

		// creating a blog, should automatically be assigned with the user just created
		const aNewBlog = {
			title: 'A blog with user',
			author: 'Random Author',
			url: 'https://localhost/blog',
			likes: 0,
		}

		await api.post('/api/blogs/').send(aNewBlog).expect(201).expect('Content-Type', /json/)

		const response = await api.get('/api/users/').expect(200).expect('Content-Type', /json/)

		console.log(response.body[0].blogs)
		assert.strictEqual(response.body.length, 1)
		assert.strictEqual(response.body[0].blogs.length, 1)
		assert(Object.prototype.hasOwnProperty.call(response.body[0].blogs[0], 'title'))
		assert.strictEqual(response.body[0].blogs[0].title, aNewBlog.title)
	})
})

after(async () => {
	console.log('closing connection...')
	await mongoose.connection.close()
	console.log('closed')
})
