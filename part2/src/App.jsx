// Import React Hooks: 'useState' for component state management, 'useEffect' for handling side-effects (like API calls)
import { useEffect, useState } from 'react'

// Import custom child components
import AddNew from './AddNew' // Form component for adding a new contact
import Filter from './Filter' // Search input component for filtering contacts

// Import the backend service module containing axios API methods (getAll, create, update, removeContact)
import newContact from './services/bkend.js'

import Notification from './Notification'

// Main Application Component
const App = () => {
  // 'persons' holds the complete, master list of contacts fetched from the database
  const [persons, setPersons] = useState([])

  // 'filteredPersons' holds the list of contacts currently displayed to the user (can be filtered)
  const [filteredPersons, setFilteredPersons] = useState(persons)

  // 'newName' tracks the value typed into the name input field (controlled component)
  const [newName, setNewName] = useState('')

  // 'newNumber' tracks the value typed into the phone number input field (controlled component)
  const [newNumber, setNewNumber] = useState('')

  // 'filterName' tracks the search term entered into the search filter input field
  const [filterName, setFilterName] = useState('')

  const [notfMessage, setNotfMessage] = useState(null)

  // useEffect executes side effects. The empty dependency array '[]' ensures this runs ONLY ONCE when the component mounts
  useEffect(() => {
    // Fetch all existing contacts from the JSON backend server
    newContact.getAll().then(contact => {
      // Initialize both state arrays with the fetched data
      setPersons(contact)
      setFilteredPersons(contact)
    })
  }, [])

  // Event handler for the search filter input field
  const handleFilterNameChange = (event) => {
    // 'event.target.value' captures whatever the user types and updates 'filterName' state
    setFilterName(event.target.value)
  }

  // Event handler for the name input field in the Add form
  const handleNameChange = (event) => {
    // Updates 'newName' state as the user types
    setNewName(event.target.value)
  }

  // Event handler for the phone number input field in the Add form
  const handleNumberChange = (event) => {
    // Updates 'newNumber' state as the user types
    setNewNumber(event.target.value)
  }

  // Function called when the user submits the "Add a new contact" form
  const addName = (event) => {
    // Prevents the default browser action of refreshing the whole page on form submit
    event.preventDefault()

    // Construct a new contact object from the current input values
    const newPerson = { name: newName, number: newNumber }

    // Check if a contact with the entered name already exists in the phonebook
    if (filteredPersons.some(person => person.name === newName)) {
      // Notify the user that the contact will be updated
      // alert(`${newName} is updated`)
      setNotfMessage(`${newName} is updated`)
      setTimeout(() => {
        setNotfMessage(null)
      }, 5000);

      // Find the existing person object from the list to get its unique database 'id'
      const personObject = filteredPersons.find(person => person.name === newName)
      const id = personObject.id
      // Create an updated object by keeping the existing properties (including id) and replacing 'number'
      const updatedPerson = { ...personObject, number: newNumber }

      // Send an HTTP PUT request to update the record in the backend server
      newContact.update(id, updatedPerson).then(() => {
        // Update local state by replacing only the modified contact in the arrays
        setPersons(persons.map((person) => person.id === id ? updatedPerson : person))
        setFilteredPersons(filteredPersons.map((person) => person.id === id ? updatedPerson : person))

        // Reset the form input fields back to empty strings
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        // Log an error message to the console if the API request fails
        console.log('error occured', error)
      })

      // Exit early so we do not proceed to create a duplicate contact below
      return
    }

    // If the contact does not already exist, send an HTTP POST request to create it in the database
    newContact.create(newPerson).then(contact => {
      // 'contact' is the newly created object returned from the server (which includes the server-assigned 'id')
      // Append the new contact to the existing arrays using .concat() (immutable update)
      setPersons(persons.concat(contact))
      setFilteredPersons(filteredPersons.concat(contact))
      setNotfMessage(`${contact.name} is added successfully`)
      setTimeout(() => {
        setNotfMessage(null)
      }, 5000);
      // Clear the form inputs
      setNewName('')
      setNewNumber('')
    }).catch(error => console.log('error occured', error))
  }

  // Function called when the user submits the search filter form
  const filterByName = (event) => {
    // Prevent the default form reload behavior
    event.preventDefault()

    // If search term is not empty, filter the list by matching names
    if (filterName.length > 0) {
      setFilteredPersons(filteredPersons.filter(person => person.name === filterName))
    } else {
      // If search input is cleared, restore the full list
      setFilteredPersons(persons)
    }
  }

  // Function to delete a contact by ID
  const deleteContact = (id) => {
    // Send an HTTP DELETE request to the backend server for this specific contact ID
    newContact.removeContact(id).then(() => {
      // Filter out the deleted contact from local state so the UI updates immediately
      setPersons(persons.filter((person) => person.id !== id))
      setFilteredPersons(filteredPersons.filter((person) => person.id !== id))

      setNotfMessage(`Contact Deleted`)
      setTimeout(() => {
        setNotfMessage(null)
      }, 5000);
    })
  }

  // Render the User Interface (JSX)
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notfMessage} />
      {/* Filter component: receives current search term and event handlers as props */}
      <Filter
        filterName={filterName}
        handleFilterNameChange={handleFilterNameChange}
        filterByName={filterByName}
      />

      <h2>Add a new contact</h2>
      {/* AddNew component: receives input states, change handlers, and form submission handler as props */}
      <AddNew
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />

      <h2>Numbers</h2>
      <ul>
        {
          /* Map each contact in filteredPersons to an <li> list item */
          filteredPersons.map(person => (
            // 'key' is required by React to uniquely identify list elements across re-renders
            <li key={person.id}>
              {person.name} {person.number}
              {/* Wrapped in an arrow function so deleteContact is ONLY called when clicked, not during render */}
              <button onClick={() => deleteContact(person.id)}>delete</button>
            </li>
          ))
        }
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