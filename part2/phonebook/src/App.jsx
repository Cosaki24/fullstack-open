import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from './services/phonebook'
import Message from './components/Message'
import './styles.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    phoneService.getAll()
      .then(contacts =>
        setPersons(contacts)
      )
  }, [])

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
      if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)){
        const personToUpdate = persons.find(p => p.name === person.name )
        phoneService.update(personToUpdate.id, person)
        .then(newDetails => {
          setPersons(persons.map(p => p.name === person.name ? newDetails : p))
          setMessage(`Updated ${newDetails.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 2000)
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      phoneService.create(person)
      .then(newContact => {
        setPersons(persons.concat(newContact))
        setMessage(`Added ${newContact.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
        setNewName('')
        setNewNumber('')
      })  
    }
  }

  const handleDelete = (id) => {
    if(window.confirm(`Delete ${persons.filter(p => p.id == id)[0].name} ?`)){
      phoneService.deleteItem(id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== deletedPerson.id))
        })
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <Filter keyword={keyword} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleInputChange={handleInputChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons people={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App

