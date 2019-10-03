const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
})

eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Event', eventSchema)