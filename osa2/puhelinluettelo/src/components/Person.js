import React from 'react'

const Person = ({person, doRemovePerson}) => {
  return (
        <p>{
          person.name} {person.number}
          &nbsp;
          <button onClick={doRemovePerson}>delete</button>
        </p>
    )
  }

export default Person