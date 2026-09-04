const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
require('dotenv').config()

const Contact = require('./models/contact')
morgan.token('body', request => JSON.stringify(request.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))
app.use(cors())

app.get('/', (request, response) => {
  response.send('Phonebook App')
})

app.get('/api/contacts', (request, response, next) => {
  Contact.find({})
    .then((c) => {
      response.json(c)
    })
    .catch(e => next(e))
})

app.get('/api/contacts/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then((c) => {
      if (c) {
        response.json(c)
      }
      else {
        response.status(404).end()
      }
    })
    .catch((e) => {
      next(e)
    })
})

app.get('/info', (request, response, next) => {
  Contact.countDocuments({})
    .then((count) => {
      const timeStamp = new Date().toString()
      response.send(`<p> Phonebook has ${count} contacts </p>
    <p> ${timeStamp} </p>`)
    })
    .catch(error => next(error))
})

app.post('/api/contacts', async (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  }
  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }
  try {
    const existingName = await Contact.findOne({ name: body.name })

    if (existingName) {
      return response.status(400).json({ error: 'name must be unique' })
    }

    const existingNumber = await Contact.findOne({ number: body.number })
    if (existingNumber) {
      return response.status(400).json({ error: 'number already assigned to contact' })
    }
    const newContact = new Contact({
      name: body.name,
      number: body.number,
    })
    const savedContact = await newContact.save()
    response.status(201).json(savedContact)
  }
  catch (error) {
    console.log('error: ', error)
    next(error)
  }
})

app.put('/api/contacts/:id', (request, response, next) => {
  const body = request.body

  const updatedContact = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(request.params.id, updatedContact, { new: true, runValidators: true, context: 'query' })
    .then(uc => response.status(200).json(uc))
    .catch(e => next(e))
})
app.delete('/api/contacts/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(e => next(e))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed ID' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
