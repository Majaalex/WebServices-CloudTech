const eventsRouter = require('express').Router()
const Event = require('../models/event')

// Get all events
eventsRouter.get('', (req, res, next) => {
  Event
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
    .catch(error => next(error))
})

// Get a specific event
eventsRouter.get('/:id', (req, res, next) => {
  const id = req.params.id
  Event
    .findById({ _id: id })
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})
// Add an event
eventsRouter.post('', (req, res, next) => {
  const event = new Event(req.body)

  event
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => next(error))
})

// Delete an event
eventsRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Event
    .deleteOne({ _id: id })
    .then(res.status(204).end())
    .catch(error => next(error))
})


// Update an event
eventsRouter.put('/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  const setter = { $set: {} }
  if (body.type) setter.$set['type'] = body.type
  if (body.date) setter.$set['date'] = body.date
  if (body.totalCost) setter.$set['totalCost'] = body.totalCost
  if (body.address) setter.$set['address'] = body.address
  if (body.detail) setter.$set['detail'] = body.detail
  Event
    .findOneAndUpdate(
      { _id: id },
      setter,
      { runValidators: true, context: 'query' },
      (error) => {
        if (error) next(error)
        else res.status(204).end()
      })
})

module.exports = eventsRouter