import React from 'react'
import { Link } from 'react-router-dom'


const New = () => {
  return (
    <div style={padding}>
      <Link style={padding} to="/new/registration">New registration</Link>
      <Link style={padding} to="/new/event">New event</Link>
      <Link style={padding} to="/new/person">New person</Link>
    </div>
  )
}

const padding = { padding: 5 }
export default New



