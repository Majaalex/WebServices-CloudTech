import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Persons = () => {
  const [eventData, setEventData] = useState(null)

  useEffect(() => {
    const eventUrl = "http://localhost:3003/api/events"
    axios.get(eventUrl)
      .then(res => {
        setEventData(res.data)
      })
  }, [])
  if (eventData) {
    return (
      <div style={center}>
        <div style={div}>
          List of people
          {eventData.map(e => <ul key={e.id} style={list}> <Link to={`/modify/events/${e.id}`}>{e.name} - {e.type}</Link></ul>)}
        </div>
      </div>
    )
  } else {
    return (
      <div style={center}>
        {"Your list is loading!"}
      </div>
    )
  }
}

const list = { textAlign: 'left' }
const div = { float: 'left', width: '300px', textAlign: 'left'}
const center = { display: 'flex', justifyContent: 'center' }
export default Persons