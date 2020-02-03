import React from 'react'
import puhelinluetteloService from '../services/puhelinluettelo'

const PersonForm = (props) => {

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked')
    const nameToAdd = props.newName

    const nameObject = {
      name: props.newName,
      number: props.newNumber,
    }

    if (!props.persons.some(person => person.name === props.newName)) {
      
      puhelinluetteloService
        .create(nameObject)
        .then(returnedPerson => {
          props.setPersons(props.persons.concat(returnedPerson))
          props.setNewName('')
          props.setNewNumber('')
        })
        props.setErrorMessage(
          `Added ${nameToAdd}`
        )
        setTimeout(() => {
          props.setErrorMessage(null)
        }, 5000)

      } else {
        if (window.confirm(`${props.newName} is already added to phonebook, replace the old number with a new one?`)) {
          const updatePerson = props.persons.find(p => p.name === props.newName)
          const updateID = updatePerson.id
          puhelinluetteloService
            .update(updateID, nameObject)
            .then(returnedPerson => {
              const filtered = props.persons.filter(person => person.name !== updatePerson.name)
              props.setPersons(filtered.concat(returnedPerson))
              props.setNewName('')
              props.setNewNumber('')
            })
            props.setErrorMessage(
              `Updated ${nameToAdd}`
            )
            setTimeout(() => {
              props.setErrorMessage(null)
            }, 5000)
        }
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