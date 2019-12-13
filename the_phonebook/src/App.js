import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ filterValue, setFilterValue ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

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
