import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/personsService'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [containsFilter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorStyle, setErrorStyle] = useState({color: 'green'})

  const hook = () => {
    console.log('effect')
    updatePersons()
  }
  
  useEffect(hook, [])

  const updatePersons = (event) => {
    personsService
    .getAll()
    .then(responsePersons => {
      console.log('persons updated')
      setPersons(responsePersons)
    })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const personsToShow = containsFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(containsFilter.toLowerCase()))

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()
    const person = {name: newName, number: newNumber}

    if (persons.some(per => per.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService.update(persons.find(per => per.name === newName).id, person)
          .then(response => {
            console.log(response)
            updatePersons()
            showError(`Person's ${person.name} number was updated`, {color: 'green'})
            setNewName('')
            setNewNumber('')
          })
      }
      return;
    }

    personsService.create(person)
      .then(response => {
        console.log(response)
        updatePersons()
        person.id = response.id
        showError(`Person ${person.name} was added`, {color: 'green'})
        setNewName('')
        setNewNumber('')
      })
  }

  const showError = (msg, style) => {
    console.log(msg)
    setErrorMessage(msg)
    setErrorStyle(style)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  
  const updateAfterDelete = (msg, style) => {
    updatePersons()
    showError(msg, style)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} style={errorStyle}/>
      <Filter filter={containsFilter} hFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm name={newName} num={newNumber} onSub={addPerson} hNameChange={handleNameChange} hNumChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} updateAfterDelete={updateAfterDelete}/>
    </div>
  )

}

export default App