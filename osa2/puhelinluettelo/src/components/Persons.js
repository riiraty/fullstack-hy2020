import React from 'react'
import puhelinluetteloService from '../services/puhelinluettelo'
import Person from './Person'

const Persons = (props) => {

  const doRemovePerson = (person) => {
    console.log('delete clicked') 
    if (window.confirm(`Delete ${person.name} ?`)) {
      const removablePerson = props.persons.find(p => p.name === person.name)
      console.log(person)
      const removableID = person.id
      console.log(removableID)
  
      puhelinluetteloService
        .remove(removableID, removablePerson)
        .then(response => {
          console.log(response)
          console.log('response logged<')
          props.setPersons(props.persons.filter(person => person.name !== removablePerson.name))
        })
        .catch(error => {
          console.log('error while removing')
        })

    }
     
  }

  const filtered = props.persons.filter(person => person.name.toLowerCase().includes(props.filter))
    
    return (
      filtered.map(person => <Person 
        key={person.name}
        person={person}
        doRemovePerson={() => doRemovePerson(person)} 
      />)
    )
  }

export default Persons