import React from 'react'
import Person from './Person'

const Persons = (props) => {
    const filtered = props.persons.filter(person => person.name.toLowerCase().includes(props.filter))
    
    return (
      filtered.map(person => <Person key={person.name} person={person} />)
    )
  }

export default Persons