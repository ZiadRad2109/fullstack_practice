import { useState } from 'react'
import AddNew from './AddNew'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Ziad Hisham', number: '01011110022' }
  ])
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the list`)
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setFilteredPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }
  const filterByName = (event) => {
    event.preventDefault()
    if (filterName.length > 0) {
      setFilteredPersons(persons.filter(person => person.name === filterName))
    }
    else {
      setFilteredPersons(persons)
    }

  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} filterByName={filterByName} />



      <h2>Add a new contact</h2>
      <AddNew newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addName={addName} />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App

// import Course from "./Course"
// const App = () => {
//   const courses = [{
//     id: 1,
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10,
//         id: 1
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7,
//         id: 2
//       },
//       {
//         name: 'State of a component',
//         exercises: 14,
//         id: 3
//       },
//       {
//         name: 'Redux',
//         exercises: 11,
//         id: 4
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Node.js',
//     parts: [
//       {
//         name: 'Routing',
//         exercises: 3,
//         id: 1
//       },
//       {
//         name: 'Middlewares',
//         exercises: 7,
//         id: 2
//       }
//     ]
//   }
//   ]

//   return (
//     <>
//       {courses.map(course => <Course key={course.id} course={course} />)}
//     </>
//   )
// }

// export default App