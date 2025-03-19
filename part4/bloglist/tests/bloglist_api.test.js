const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')

const api = supertest(app)

const testBlogs = [
	{
		title: 'Does organization matter?',
		author: 'Robert C. Martin',
		url: 'https://blog.cleancoder.com/uncle-bob/2015/04/15/DoesOrganizationMatter.html',
		likes: 60,
		id: '67d409dc93533fdb1bda112b',
	},
	{
		title: 'Tools are not the answer',
		author: 'Robert C. Martin',
		url: 'https://blog.cleancoder.com/uncle-bob/2017/10/04/CodeIsNotTheAnswer.html',
		likes: 50,
		id: '67d416deca25a12448908791',
	},
	{
		title:
			'How to turn off website notifications in Chrome for Android for good',
		author: 'Tamas Baka',
		url: 'https://randomblog.hu/how-to-turn-off-website-notifications-in-chrome-on-android-for-good/',
		likes: 100,
		id: '67d41ea7f6697e92337c4f3f',
	},
]

beforeEach(async () => {
	await Blog.deleteMany({})
	let blogObject = new Blog(testBlogs[0])
	await blogObject.save()
})

test.only('api returns json response', async () => {
	await api.get('/api/blogs/').expect(200).expect('Content-Type', /json/)
})

test.only('api returns one note', async () => {
	const response = await api.get('/api/blogs/')

	assert.strictEqual(response.body.length, 1)
})

test.only('api returns a note with 60 likes', async () => {
	const response = await api.get('/api/blogs/')

	assert.strictEqual(response.body[0].likes, 60)
})

after(async () => {
	await mongoose.connection.close()
})
