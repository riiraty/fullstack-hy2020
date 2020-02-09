import React from 'react'

const Persons = ({persons, deletePerson}) => {
    return (
      persons.map(person => 
        <p key={person.name}>
          {person.name} {person.number}
          &nbsp;
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      )
    )
  }

export default Persons