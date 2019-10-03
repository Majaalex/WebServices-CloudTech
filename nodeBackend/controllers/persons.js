const personsRouter = require('express').Router()
const Person = require('../models/person')

// Get all people
personsRouter.get('', (req, res, next) => {
  Person
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
    .catch(error => next(error))
})

// Get a specific person
personsRouter.get('/:id', (req, res, next) => {
  const id = req.params.id
  Person
    .findById({ _id: id })
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

// Add a person
personsRouter.post('', (req, res, next) => {
  const person = new Person(req.body)

  person
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => next(error))
})

// Delete a person
personsRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Person
    .deleteOne({ _id: id })
    .then(res.status(204).end())
    .catch(error => next(error))
})

// Update a person
personsRouter.put('/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  const setter = { $set: {} }
  if (body.firstName) setter.$set['firstName'] = body.firstName
  if (body.surName) setter.$set['surName'] = body.surName
  if (body.email) setter.$set['email'] = body.email
  if (body.phone) setter.$set['phone'] = body.phone
  Person
    .findOneAndUpdate(
      { _id: id },
      setter,
      { runValidators: true, context: 'query' },
      (error) => {
        if (error) next(error)
        else res.status(204).end()
      })
})

module.exports = personsRouter