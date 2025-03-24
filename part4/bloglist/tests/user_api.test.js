const { describe, beforeEach, after, test } = require('node:test')
//const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const userList = [
	{
		name: 'Collins Kipepe',
		username: 'cosaki',
		password: 'hesoyam',
		blogs: [],
	},
]

describe('When no user exists', async () => {
	beforeEach(async () => {
		await User.deleteMany({})
	})

	test.only('adding a user returns 201Created', async () => {
		const userToAdd = userList[1]
		await api
			.post('/api/users/')
			.send(userToAdd)
			.expect(201)
			.expect('Content-Type', /json/)
	})

	after(async () => {
		await mongoose.connection.close()
	})
})
