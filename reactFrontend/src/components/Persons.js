import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Persons = () => {
  const [personData, setPersonData] = useState(null)

  useEffect(() => {
    const personUrl = "http://localhost:3003/api/persons"
    axios.get(personUrl)
      .then(res => {
        setPersonData(res.data)
      })
  }, [])
  if (personData) {
    return (
      <div style={center}>
        <div style={div}>
          List of people
          {personData.map(p => <ul key={p.firstName} style={list}> <Link to={`/modify/persons/${p.id}`}>{p.firstName} {p.surName}</Link></ul>)}
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