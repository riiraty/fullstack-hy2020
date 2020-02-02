import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import puhelinluetteloService from './services/puhelinluettelo'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const hook = () => {
    puhelinluetteloService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }

  useEffect(hook, [])

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

      <Persons persons={persons} setPersons={setPersons} filter={newFilter} />
    </div>
  )

}

export default App