const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
	try {
		const result = await User.find({}).populate('blogs', {
			title: 1,
			url: 1,
			author: 1,
		})
		if (result.length > 0) {
			return response.status(200).json(result)
		}
		return response.status(404).json({ message: 'No users found' })
	} catch (error) {
		return response.status(400).json({ error: error })
	}
})
userRouter.post('/', async (request, response) => {
	const { name, username, password } = request.body

	const saltRounds = 10
	if (password && password.length >= 3) {
		const passwordHash = await bcrypt.hash(password, saltRounds)
		const user = new User({
			name,
			username,
			passwordHash,
		})

		try {
			const result = await user.save()
			return response.status(201).json(result)
		} catch (error) {
			switch (error.name) {
			case 'ValidationError':
				return response
					.status(400)
					.json({ error: error.name, message: error.message })
			case 'MongoServerError':
				if (error.message.includes('E11000 duplicate key error')) {
					return response.status(400).json({
						error: 'DuplicateKeyError',
						message: 'Username already exists',
					})
				} else {
					return response
						.status(400)
						.json({ error: error.name, message: error.message })
				}
			default:
				return response
					.status(400)
					.json({ error: error.name, message: error.message })
			}
		}
	} else {
		if (password && password.length < 3) {
			return response.status(400).json({
				error: 'ValidationError',
				message: 'Password too short, 3 minimum characters required',
			})
		} else {
			return response
				.status(400)
				.json({ error: 'ValidationError', message: 'Password is required' })
		}
	}
})

module.exports = userRouter
