import React, { useState, useEffect } from 'react'
import axios from 'axios'
import data from '../services/data'

const Event = (props) => {
  const personsUrl = "http://localhost:3003/api/persons/" + props.id
  const [personData, setPersonData] = useState(null)
  const [firstNameValue, setFirstNameValue] = useState("")
  const [surNameValue, setSurNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [phoneValue, setPhoneValue] = useState("")
  useEffect(() => {
    axios.get(personsUrl)
      .then(res => {
        if (res.data) {
          setPersonData((res.data))
          setFirstNameValue(res.data.firstName)
          setSurNameValue(res.data.surName)
          setEmailValue(res.data.email)
          setPhoneValue(res.data.phone)
        }
      })
  }, [personsUrl])

  const handleSetFirstName = (event) => setFirstNameValue(event.target.value)
  const handleSetSurName = (event) => setSurNameValue(event.target.value)
  const handleSetType = (event) => setEmailValue(event.target.value)
  const handleSetDate = (event) => setPhoneValue(event.target.value)
  const postUpdatedData = async () => {
    try {
      fetch(personsUrl, {
        method: "PUT",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstNameValue,
          surName: surNameValue,
          email: emailValue,
          phone: phoneValue,
        })
      })
    } catch (e) {
      console.log('Error: ', e)
    }
    window.alert("You have updated this person.")
  }

  const deleteEntry = () => {
    const confirmPrompt = "Do you want to delete this person from the database?"
    if (window.confirm(confirmPrompt)) data.remove(personsUrl)
  }

  if (personData) {
    return (
      <div>
        <ul>
          First name: <input value={firstNameValue} onChange={handleSetFirstName} />
        </ul><ul>
          Last name: <input value={surNameValue} onChange={handleSetSurName} />
        </ul><ul>
          Email: <input value={emailValue} onChange={handleSetType} />
        </ul><ul>
          Phone: <input value={phoneValue} onChange={handleSetDate} />
        </ul><ul>
          <button onClick={postUpdatedData}>Update</button> <button onClick={deleteEntry}>Delete</button>
        </ul>
      </div>
    )
  }

  return "This person does not exist!"
}
export default Event