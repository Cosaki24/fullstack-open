const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

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
