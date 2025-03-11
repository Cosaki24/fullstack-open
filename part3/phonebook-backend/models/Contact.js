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
    name: String,
    number: String,
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)
