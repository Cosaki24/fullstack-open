require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
const Contact = require('./models/Contact')
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
morgan.token('request-body', (request, response) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))


app.get("/api/persons", (request, response) => {
    Contact.find({}).then(people => {
        response.json(people)
    })
})

const getInfo = (array) => `<p>Phonebook has info for ${array.length} people</p>
              <p>${new Date().toString("en-US")}`

app.get("/info", (request, response) => {
    Contact.find({}).then(people => {
        response.send(getInfo(people))
    })
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id

    let person;
    Contact.findById(id).then(result => {
        person = result;
    })

    if(!person){
        return response.status(404)
            .json({
                error: "No entry found"
            })
    }
    response.json(person)
})

app.post("/api/persons", (request, response)=>{
    const name = request.body.name
    const number = request.body.number

    if(!name || !number){
        if(!name){
            return response.status(400).json({
                error: 'name is missing'
            })
        }

        if(!number){
            return response.status(400).json({
                error: 'number is missing'
            })
        }
        
    }

    // if(phonebook.some(person => person.name === name)){
    //     return response.status(409).json({
    //         error: `entry with name '${name}' already exists`
    //     })
    // }

    const person = new Contact({
        name: name,
        number: number
    })

    person.save().then(result => {
        response.status(201).json({
            message: 'entry added',
            contact: result
        })
    })
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    Contact.findByIdAndDelete(id)
    .then(result => {
        if(result){
            response.status(200).json({message: `${result.name} has been deleted`})
        }else{
            response.status(204).end()
        }
    })
    .catch(error => {
        console.log(error)
        response.status(400).json({error: 'bad id'})
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listens on port:${PORT}`)
})