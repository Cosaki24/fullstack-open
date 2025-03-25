const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
	console.log('we entered..')
	const user = new User(request.body)

	try {
		const result = await user.save()
		return response.status(201).json(result)
	} catch (error) {
		console.log('we found an error, I am returning a response')
		return response.status(400).json({ error: error })
	}
})

module.exports = userRouter
