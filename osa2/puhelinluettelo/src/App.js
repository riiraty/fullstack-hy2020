import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

const addPerson = (event) => {
      event.preventDefault()
      console.log('button clicked')
      if (!persons.some(person => person.name === newName)) {
        const nameObject = {
            name: newName,
            number: newNumber,
        }
  
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
      } else {
        window.alert(`${newName} is already added to phonebook`)
      }
}

const Filter = ({persons}) => {
  const filtered = persons.filter(person => person.name.toLowerCase().includes(newFilter))
  return (
    <div>
      {filtered.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )

}

const handleNameChange = (event) => {
    setNewName(event.target.value)
}

const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
}

const handleFilter = (event) => {
    setNewFilter(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter with: <input
          value={newFilter}
          onChange={handleFilter} />
      </div>
      <h3>Add new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
            number: <input
              value={newNumber}
              onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
        <div>
          <Filter persons={persons} />
        </div>
    </div>
  )

}

export default App