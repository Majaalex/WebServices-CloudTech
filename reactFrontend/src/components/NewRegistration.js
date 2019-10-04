import React, { useState, useEffect } from 'react'
import Select from "react-dropdown-select"
import 'react-dropdown/style.css'
import axios from 'axios'

const NewRegistration = () => {
  const [eventData, setEventData] = useState(null)
  const [personData, setPersonData] = useState(null)
  const [selectedPerson, setselectedPerson] = useState('')
  const [selectedEvent, setSelectedEvent] = useState('')
  useEffect(() => {
    const eventsUrl = "http://localhost:3003/api/events"
    const personUrl = "http://localhost:3003/api/persons"
    axios.get(personUrl)
      .then(res => { setPersonData(res.data) })
    axios.get(eventsUrl)
      .then(res => { setEventData((res.data)) })
  }, [])

  if (personData && eventData) {
    const personOptions = personData.map(p => {
      var emptyOption = {
        value: "",
        label: ""
      }
      emptyOption.value = p.id
      emptyOption.label = p.firstName + " " + p.surName
      return emptyOption
    })
    const eventOptions = eventData.map(e => {
      var emptyOption = {
        value: "",
        label: ""
      }
      emptyOption.value = e.id
      emptyOption.label = e.name + " - " + e.type
      return emptyOption
    })

    const handlePersonSelection = (values) => setselectedPerson(values[0].value)
    const handleEventSelection = (values) => setSelectedEvent(values[0].value)
    const postUpdatedData = async () => {
      try {
        fetch("http://localhost:5000/api/registration", {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Person: selectedPerson,
            Event: selectedEvent
          })
        })
      } catch (e) {
        console.log('Error: ', e)
      }
      window.alert('A new registration has been made.')
    }
    return (
      <div>
        <div style={center}>
          <div style={div}>
            <Select options={personOptions} onChange={values => handlePersonSelection(values)} />
          </div>
          <div style={div}>
            <Select options={eventOptions} onChange={values => handleEventSelection(values)} />
          </div>
        </div>
        <div>
          <button onClick={postUpdatedData}>Add Registration</button>
        </div>
      </div>
    )
  } else {
    return (
      <div>
      </div>
    )
  }
}

const div = { float: 'left', width: '300px', padding: 7 }
const center = { display: 'flex', justifyContent: 'center' }
export default NewRegistration