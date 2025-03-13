const mongoose = require('mongoose')

const connString = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
console.log("connecting to mongoDB...")
mongoose.connect(connString)
    .then(result => 
        console.log("connecting to mongoDB succeded")
    )
    .catch(error => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "name is too short"],
        required: [true, "name is required"]
    },
    number: {
        type: String,
        validate: {
            validator: function(v){
                return /^\d{2,3}-\d{5,}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: [true, 'phone number is required']
    },
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)
