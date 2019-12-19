import React from 'react'

const Persons = ({data}) => {
  return (
    <div>
      {
        data.map((person, i) =>
          <p key={i}>{person.name}:  {person.phoneNumber}</p>
        )
      }
    </div>
  )
}

export default Persons;
