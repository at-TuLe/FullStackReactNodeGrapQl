import React from 'react'

const Persons = ({data}) => {
  return (
    <div>
      {
        data.map((person, i) =>
          <p key={i}>{person.name}:  {person.number}</p>
        )
      }
    </div>
  )
}

export default Persons;
