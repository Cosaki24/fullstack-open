import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
    
  }


  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName
    }

    if(persons.some(p => p.name === person.name )){
      alert(`${person.name} is already added to phonebook`)
    }else {
      setPersons(persons.concat(person))
      setNewName('')
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person) => <div key={person.name}>{person.name}</div>)
      }
    </div>
  )
}

export default App

