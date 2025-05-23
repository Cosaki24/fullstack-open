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

	after(async () => {
		console.log('closing connection...')
		await mongoose.connection.close()
		console.log('closed')
	})
})
