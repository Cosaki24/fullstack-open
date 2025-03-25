const { describe, beforeEach, after, test } = require('node:test')
//const assert = require('node:assert')
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
]

describe('When no user exists', async () => {
	beforeEach(async () => {
		console.log('deleting existing users...')
		await User.deleteMany({})
		console.log('existing users deleted')
	})

	test.only('adding a user returns 201Created', async () => {
		console.log('starting to test..')
		const userToAdd = userList[1]
		console.log('user data: ', userToAdd)
		await api
			.post('/api/users/')
			.send(userToAdd)
			.expect(201)
			.expect('Content-Type', /json/)
	})

	after(async () => {
		console.log('closing connection...')
		await mongoose.connection.close()
		console.log('closed')
	})
})
