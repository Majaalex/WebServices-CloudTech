import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Modifications = () => {
  const [eventData, setEventData] = useState(null)
  const [personData, setPersonData] = useState(null)

  useEffect(() => {
    const eventsUrl = "http://localhost:3003/api/events"
    const personUrl = "http://localhost:3003/api/persons"
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
          {personData.map(p =>
            <ul key={p.id} style={list}>
              <Link to={`/modify/persons/${p.id}`}>{p.firstName} {p.surName}</Link>
              <ul>
                {p.email}
              </ul>
              <ul>
                {p.phone}
              </ul>
            </ul>
          )}
        </div>
        <div style={div}>
          {eventData.map(e =>
            <ul key={e.id}  style={list}>
              <Link to={`/modify/events/${e.id}`}>{e.name}, {e.type}</Link>
              <ul>
                {e.date}
              </ul>
              <ul>
                {e.totalCost}
              </ul>
              <ul>
                {e.address}
              </ul>
              <ul>
                {e.detail}
              </ul>
            </ul>
          )}
        </div>
      </div>
    )
  }
  return "Loading!"
}

const div = { float: 'left', width: '300px', padding: 7}
const center = { display: 'flex', justifyContent: 'center' }
const list = {textAlign: 'left'}
export default Modifications