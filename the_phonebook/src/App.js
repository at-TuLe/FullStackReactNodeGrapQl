import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/Person'
import Notification from './services/Notification'
import './index.css'
import loginService from './services/login' 

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ filterValue, setFilterValue ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ username, setUsername ] = useState('') 
  const [ password, setPassword ] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    getAll();
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedPersonAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      personService.setToken(user.token)
    }
  }, [])

  const getAll = () => {
    personService
      .getAll()
      .then(response => {
        console.log(response)
        setPersons(response)
      })
      .catch(error => {
        console.log(error.response.data)
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
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(
            error.response.data
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
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
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(
            error.response.data
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      personService.setToken(user.token)
      window.localStorage.setItem(
        'loggedPersonAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )


  return (
    <div>

      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      {user === null && loginForm()}

      <Filter searchWord={filterValue} handleFilter={handleChangeFilterValue} />
      <h1>Add a new</h1>
      <PersonForm onAddNewPerson={addNewPerson} />
      <Persons data={showPersons} onDelete={deletePerson}/>
    </div>
  )
}

export default App;
