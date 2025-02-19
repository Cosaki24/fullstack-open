const express = require('express')
const PORT = 3001
const app = express()
app.use(express.json())

const phonebook = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(phonebook)
})

const info = `<p>Phonebook has info for ${phonebook.length} people</p>
              <p>${new Date().toString("en-TZ")}`

app.get("/info", (request, response) => {
    response.send(info)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id

    person = phonebook.find(p => p.id === id)
    if(!person){
        return response.status(404)
            .json({
                error: "No entry found"
            })
    }
    response.json(person)
})

app.listen(PORT, () => {
    console.log(`Server listens on port:${PORT}`)
})