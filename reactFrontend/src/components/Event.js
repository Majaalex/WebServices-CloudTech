import React, { useState, useEffect } from 'react'
import axios from 'axios'
import data from '../services/data'
import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'

const Event = (props) => {
  const eventsUrl = "http://localhost:3003/api/events/" + props.id
  useEffect(() => {
    axios.get(eventsUrl)
      .then(res => {
        if (res.data) {
          setEventData((res.data))
          setNameValue(res.data.name)
          setTypeValue(res.data.type)
          setDateValue(res.data.date)
          setCostValue(res.data.totalCost)
          setAddressValue(res.data.address)
          setDetailValue(res.data.detail)
        }
      })
  }, [eventsUrl])

  const [eventData, setEventData] = useState(null)
  const [nameValue, setNameValue] = useState("")
  const [typeValue, setTypeValue] = useState("")
  const [dateValue, setDateValue] = useState("")
  const [costValue, setCostValue] = useState("")
  const [addressValue, setAddressValue] = useState("")
  const [detailValue, setDetailValue] = useState("")

  const handleSetName = (event) => setNameValue(event.target.value)
  const handleSetType = (event) => setTypeValue(event.target.value)
  const handleSetDate = (event) => setDateValue(event.target.value)
  const handleSetCost = (event) => setCostValue(event.target.value)
  const handleSetAddress = (event) => setAddressValue(event.target.value)
  const handleSetDetail = (event) => setDetailValue(event.target.value)

  const postNewPerson = async () => {
    try {
      fetch(eventsUrl, {
        method: "PUT",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameValue,
          type: typeValue,
          date: dateValue,
          totalCost: costValue,
          address: addressValue,
          detail: detailValue
        })
      })
      window.alert("You have updated this event.")
    } catch (e) {
      console.log('Error: ', e)
    }

  }

  const deleteEntry = () => {
    const confirmPrompt = "Do you want to delete this person from the database?"
    if (window.confirm(confirmPrompt)) data.remove(eventsUrl)
  }

  if (eventData) {
    return (
      <div>
        <ul>
          Name: <input value={nameValue} onChange={handleSetName} />
        </ul><ul>
          Type: <input value={typeValue} onChange={handleSetType} />
        </ul><ul>
          Date: <input value={dateValue} onChange={handleSetDate} />
        </ul><ul>
          Total cost: <input value={costValue} onChange={handleSetCost} />
        </ul><ul>
           Address: <input value={addressValue} onChange={handleSetAddress} />
        </ul><ul>
          Details: <input value={detailValue} onChange={handleSetDetail} />
        </ul><ul>
          <button onClick={postNewPerson}>Update</button> <button onClick={deleteEntry}>Delete</button>
        </ul>
      </div>
    )
  } else {
    return "This event does not exist!"
  }
}
export default Event