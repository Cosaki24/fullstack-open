const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
	const listWithOneBlog = [
		{
			title: 'Does organization matter?',
			author: 'Robert C. Martin',
			url: 'https://blog.cleancoder.com/uncle-bob/2015/04/15/DoesOrganizationMatter.html',
			likes: 10,
			id: '67d409dc93533fdb1bda112b',
		},
	]

	const listWithManyBlogs = [
		{
			title: 'Does organization matter?',
			author: 'Robert C. Martin',
			url: 'https://blog.cleancoder.com/uncle-bob/2015/04/15/DoesOrganizationMatter.html',
			likes: 6,
			id: '67d409dc93533fdb1bda112b',
		},
		{
			title: 'Tools are not the answer',
			author: 'Robert C. Martin',
			url: 'https://blog.cleancoder.com/uncle-bob/2017/10/04/CodeIsNotTheAnswer.html',
			likes: 20,
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

	test('of empty list is zero', () => {
		assert.strictEqual(listHelper.totalLikes([]), 0)
	})

	test('when list has only one blog equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		assert.strictEqual(result, 10)
	})

	test('of a bigger list is calculated right', () => {
		const result = listHelper.totalLikes(listWithManyBlogs)
		assert.strictEqual(result, 126)
	})
})
