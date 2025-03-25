const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: { type: String, required: [true, 'name is required'] },
	username: {
		type: String,
		required: [true, 'username is required'],
		unique: true,
	},
	passwordHash: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog',
		},
	],
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	},
})

module.exports = mongoose.model('User', userSchema)
