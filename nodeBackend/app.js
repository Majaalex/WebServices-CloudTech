const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const personsRouter = require('./controllers/persons')
const eventsRouter = require('./controllers/events')
const middleware = require('./utils/middleware')

// Morgan for logging
// Creates a morgan token :body which logs the content in the body of a request
morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})
var loggerFormat = '":method :url" :status :response-time ms :body'
app.use(morgan(loggerFormat, {
  skip: function (res) {
    return res.statusCode < 400
  },
  stream: process.stderr
}))
app.use(morgan(loggerFormat, {
  skip: function (res) {
    return res.statusCode >= 400
  },
  stream: process.stdout
}))

mongoose.connect(config.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('Connected to db'))
  .catch(error => console.log('Error connectiong to db', error.message)
  )

app.use(cors())
app.use(bodyParser.json())

app.use('/api/persons', personsRouter)
app.use('/api/events', eventsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app