import React, { useState } from 'react'

const App = ({onAddNewPerson}) => {
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newPhoneNumber
    }

    onAddNewPerson(newPerson)
    alert(`${newName} is added to phonebooks`);
    setNewName('');
    setNewPhoneNumber('');
  }

  const handleChangeNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name: <input value={newName} onChange={handleChangeNewName}/>
        </div>
        <div>
          phone number: <input value={newPhoneNumber} onChange={handleChangeNewPhoneNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default App;
