import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/Person'
import Notification from './services/Notification'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ filterValue, setFilterValue ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    getAll();
  }, [])

  const getAll = () => {
    personService
      .getAll()
      .then(response => {
        console.log(response)
        setPersons(response)
      })
  }

  const addNewPerson = (newPerson) => {
    const existPerson = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
    console.log(existPerson);
    if (!existPerson){
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response));
          alert(`${response.name} is added to phonebooks`);
          setFilterValue('');
        })
    } else {
      const ok = window.confirm(`${newPerson.name} is alredy added. Do you want to replace old number?`);
      if (ok) {
        personService
        .update(existPerson.id, newPerson)
        .then(() => {
          getAll();
          setFilterValue('');
        })
      }
    }
  }

  const deletePerson = (person) => {
    const ok = window.confirm(`Delete ${person.name} ?`);
    if(ok) {
      personService
        .remove(person.id)
        .then(res => {
          console.log(res)
          getAll();
        })
        .catch(error => {
          setErrorMessage(
            `'${person.name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const handleChangeFilterValue = (event) => {
    setFilterValue(event.target.value)
  }
  const showPersons = persons.filter(person => person.name.includes(filterValue))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />

      <Filter searchWord={filterValue} handleFilter={handleChangeFilterValue} />
      <h1>Add a new</h1>
      <PersonForm onAddNewPerson={addNewPerson} />
      <Persons data={showPersons} onDelete={deletePerson}/>
    </div>
  )
}

export default App;
