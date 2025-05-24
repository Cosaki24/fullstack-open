const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: { type: String, required: [true, 'required'] },
	username: {
		type: String,
		required: [true, 'required'],
		unique: true,
		minLength: [3, 'Minimum characters is 3, {VALUE} is too short!']
	},
	passwordHash: { type: String, required: [true, 'required'] },
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
