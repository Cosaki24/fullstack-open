import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const personsToShow = keyword
    ? persons.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()))
    : persons

  const handleFilter = (event) => {
    setKeyword(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }

    if (persons.some(p => p.name === person.name)) {
      alert(`${person.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with <input value={keyword} onChange={handleFilter} />
      </p>
      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {

        personsToShow.map((person) => <div key={person.name}>{person.name} {person.number}</div>)
      }
    </div>
  )
}

export default App

