const errorHandler = (error, req, res, next) => {

  if (error.name === 'TypeError') {
    return res.status(500).send({ error: 'Issue with the server' })
  } else if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'Incorrect Id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  } else if (error.name === 'SyntaxError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
  errorHandler,
  unknownEndpoint
}