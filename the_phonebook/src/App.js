import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456' },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523' },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345' },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122' }
  ]);
  const [ filterValue, setFilterValue ] = useState('')

  const addNewPerson = (person) => {
    setPersons(persons.concat(person));
    setFilterValue('');
  }
  
  const handleChangeFilterValue = (event) => {
    setFilterValue(event.target.value)
  }
  const showPersons = persons.filter(person => person.name.includes(filterValue))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchWord={filterValue} handleFilter={handleChangeFilterValue} />
      <h2>Add a new</h2>
      <PersonForm onAddNewPerson={addNewPerson} />
      <Persons data={showPersons} />
    </div>
  )
}

export default App;
