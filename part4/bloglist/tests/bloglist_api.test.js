const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')

const api = supertest(app)

let testBlogs = [
	{
		title: 'Does organization matter?',
		author: 'Robert C. Martin',
		url: 'https://blog.cleancoder.com/uncle-bob/2015/04/15/DoesOrganizationMatter.html',
		likes: 60,
		_id: '67d409dc93533fdb1bda112b',
	},
	{
		title: 'Tools are not the answer',
		author: 'Robert C. Martin',
		url: 'https://blog.cleancoder.com/uncle-bob/2017/10/04/CodeIsNotTheAnswer.html',
		likes: 50,
		_id: '67d416deca25a12448908791',
	},
	{
		title:
			'How to turn off website notifications in Chrome for Android for good',
		author: 'Tamas Baka',
		url: 'https://randomblog.hu/how-to-turn-off-website-notifications-in-chrome-on-android-for-good/',
		likes: 100,
		_id: '67d41ea7f6697e92337c4f3f',
	},
	{
		title: 'All you may need is HTML',
		author: 'Fabien Sanglard',
		url: 'https://fabiensanglard.net/html/index.html',
	},
	{
		author: 'Kent Beck',
		url: 'https://kentBenk.dev/blogwithouttitledoesntexist',
	},
	{
		title: 'A blog with no url',
		author: 'Anonymous',
	},
	{
		author: 'Not a Writer',
	},
]

describe('When only a single blog with 60 likes exists', async () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		let blogObject = new Blog(testBlogs[0])
		await blogObject.save()
	})

	test.only('api returns json response', async () => {
		await api.get('/api/blogs/').expect(200).expect('Content-Type', /json/)
	})

	test.only('api returns one blog', async () => {
		const response = await api.get('/api/blogs/')

		assert.strictEqual(response.body.length, 1)
	})

	test.only('api returns a blog with 60 likes', async () => {
		const response = await api.get('/api/blogs/')

		assert.strictEqual(response.body[0].likes, 60)
	})

	test.only('api returns a blog object with unique identifier property "id"', async () => {
		const response = await api.get('/api/blogs')
		assert(response.body[0].id)
	})

	describe('to insert', async () => {
		test.only('api can add one blog into the database', async () => {
			await api
				.post('/api/blogs/')
				.send(testBlogs[1])
				.expect(201)
				.expect('Content-Type', /json/)

			const response = await api.get('/api/blogs/')
			const blogTitles = response.body.map((t) => t.title)

			assert.strictEqual(response.body.length, 2)
			assert(blogTitles.includes(testBlogs[1].title))
		})

		test.only('blog without likes returns zero likes', async () => {
			await api
				.post('/api/blogs/')
				.send(testBlogs[3])
				.expect(201)
				.expect('Content-Type', /json/)

			const response = await api.get('/api/blogs/')
			const blogWithZeroLikes = response.body.find(
				(bz) => bz.title === 'All you may need is HTML'
			)
			assert(Object.prototype.hasOwnProperty.call(blogWithZeroLikes, 'likes'))
			assert.strictEqual(blogWithZeroLikes.likes, 0)
		})

		test.only('blog without title returns 400BadRequest', async () => {
			const response = await api
				.post('/api/blogs/')
				.send(testBlogs[4])
				.expect(400)
			assert(response.body.error.includes('title is required'))
		})

		test.only('blog without url returns 400BadRequest', async () => {
			const response = await api
				.post('/api/blogs/')
				.send(testBlogs[5])
				.expect(400)
			assert(response.body.error.includes('url is required'))
		})

		test.only('blog with no url and author returns 400BadRequest', async () => {
			const response = await api
				.post('/api/blogs/')
				.send(testBlogs[6])
				.expect(400)
			assert(
				response.body.error.includes('url is required') &&
					response.body.error.includes('title is required')
			)
		})
	})

	describe('to delete a blog', async () => {
		test.only('returns successfully deleted', async () => {
			const blogTodelete = testBlogs[0]._id
			const response = await api.delete(`/api/blogs/${blogTodelete}`).expect(200)
			assert(Object.prototype.hasOwnProperty.call(response.body, 'message'))
			assert.strictEqual(`a blog with id ${blogTodelete} has been deleted`, response.body.message)
		})

		test.only('with a bad id returns 400BadRequest', async () => {
			const badId = '1234shsioeerq'
			const response = await api.delete(`/api/blogs/${badId}`).expect(400)
			assert(Object.prototype.hasOwnProperty.call(response.body, 'error'))
			assert(response.body.error.includes('bad id'))
		})

		test.only('which doesnt exist returns 204NoContent', async () => {
			const nonexistentId = '67d41ea7f6697e92337c4f3f'
			await api.delete(`/api/blogs/${nonexistentId}`).expect(204)
		})
	})

	describe('to update a blog', async () => {
		test.only('with new number of likes returns correct likes', async () => {
			const blogToUpdate = testBlogs[0]._id
			const newLikes = 400
			testBlogs[0].likes = newLikes
			const response = await api.put(`/api/blogs/${blogToUpdate}`).send(testBlogs[0]).expect(200)
			assert.strictEqual(response.body.likes, newLikes)
		})

		test.only('without title or url throws validation error', async () => {
			const blogToUpdate = testBlogs[0]._id
			const randomNumber = Math.floor(Math.random() * 10)
			randomNumber % 2 === 0 ? testBlogs[0].title = null : testBlogs[0].url = null
			const response = await api.put(`/api/blogs/${blogToUpdate}`).send(testBlogs[0]).expect(400)
			assert.strictEqual(response.body.error, 'title or url is missing')
		})
	})

	after(async () => {
		await mongoose.connection.close()
	})
})
