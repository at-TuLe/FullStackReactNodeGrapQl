import React from 'react'

const Persons = ({data, onDelete}) => {

  return (
    <div>
      {
        data.map((person) =>
          <div  key={person.id}>
            {person.name}:  {person.number}
            <button onClick={() => onDelete(person)}>Delete</button>
          </div>
        )
      }
    </div>
  )
}

export default Persons;
