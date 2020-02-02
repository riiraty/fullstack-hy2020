import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = (props) => {
  const [ persons, setPersons] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

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

      <Filter newFilter={newFilter} handleFilter={handleFilter} />

      <h3>Add new</h3>

      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} handleNameChange={handleNameChange}
          newNumber={newNumber} setNewNumber={setNewNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={newFilter}/>
    </div>
  )

}

export default App