import React from 'react'
import puhelinluetteloService from '../services/puhelinluettelo'


const PersonForm = (props) => {

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked')
    if (!props.persons.some(person => person.name === props.newName)) {
      const nameObject = {
        name: props.newName,
        number: props.newNumber,
      }

      puhelinluetteloService
        .create(nameObject)
        .then(returnedPerson => {
          props.setPersons(props.persons.concat(returnedPerson))
          props.setNewName('')
          props.setNewNumber('')
        })
      } else {
        window.alert(`${props.newName} is already added to phonebook`)
      }
  }
  
    return (
      <form onSubmit={addPerson}>
      <div>
        name: <input 
          value={props.newName}
          onChange={props.handleNameChange} />
      </div>
      <div>
          number: <input
            value={props.newNumber}
            onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

export default PersonForm