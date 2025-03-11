const mongoose = require('mongoose')

if (!process.argv[2]){
    console.log('database password is required')
    process.exit(1)
}

const password = process.argv[2]

const connString = `mongodb+srv://cosaki:${password}@fullstackopen.rbqol.mongodb.net/phonebook?retryWrites=true&w=majority&appName=fullstackopen`

mongoose.set('strictQuery', false)

mongoose.connect(connString)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if(!process.argv[3] && !process.argv[4]){
    Contact.find({}).then(result => {
        console.log('phonebook: ')
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    })
}else{
    const name = process.argv[3]
    const number = process.argv[4]

    if(!name || !number){
        console.log('both name and number are required to add new contact')
        mongoose.connection.close()
        process.exit(1)
    }

    const contact = new Contact({
        name: name.toString(),
        number: number.toString(),
    })

    contact.save().then(result => {
        console.log(`added ${result.name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

