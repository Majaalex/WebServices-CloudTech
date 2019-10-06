import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Lists = () => {
  const [personData, setPersonData] = useState(null)
  const [eventData, setEventData] = useState(null)

  useEffect(() => {
    const eventsUrl = "http://localhost:3003/api/events"
    const personUrl = "https://localhost:44381/api/person"
    axios.get(personUrl)
      .then(res => {
        setPersonData(res.data)
      })
    axios.get(eventsUrl)
      .then(res => {
        setEventData((res.data))
      })
  }, [])
  if (personData && eventData) {
    return (
      <div style={center}>
        <div style={div}>
          List of people
          {personData.map(p => <ul key={p.firstName} style={list}>{p.firstName} {p.surName} - {p.totalCost}</ul>)}
        </div>
        <div style={div}>
          List of events
          {eventData.map(e => <ul key={e.id} style={list}>{e.name} - {e.type} at {e.totalCost}</ul>)}
        </div>
      </div>
    )
  } else {
    return (
      <div style={center}>
        {"Lists are loading!"}
      </div>
    )
  }
}

const list = { textAlign: 'left' }
const div = { float: 'left', width: '300px', textAlign: 'left'}
const center = { display: 'flex', justifyContent: 'center' }
export default Lists