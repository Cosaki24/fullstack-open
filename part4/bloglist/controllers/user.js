const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
	try {
		const result = await User.find({})
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
	if (password) {
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
			return response.status(400).json({ error: error })
		}
	} else {
		return response.status(400).json({ error: 'password is required' })
	}
})

module.exports = userRouter
