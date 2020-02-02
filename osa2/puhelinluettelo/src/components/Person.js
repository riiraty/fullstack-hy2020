import React from 'react'

const Person = ({person, doRemovePerson}) => {
  return (
        <p>{
          person.name} {person.number}
          <button onClick={doRemovePerson}>delete</button>
        </p>
    )
  }

export default Person