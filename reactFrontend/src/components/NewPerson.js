import React, { useState } from 'react'

const NewPerson = () => {
  const personsUrl = "http://localhost:3003/api/persons/"
  const [firstNameValue, setFirstNameValue] = useState("")
  const [surNameValue, setSurNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [phoneValue, setPhoneValue] = useState("")

  const handleSetFirstName = (event) => setFirstNameValue(event.target.value)
  const handleSetSurName = (event) => setSurNameValue(event.target.value)
  const handleSetType = (event) => setEmailValue(event.target.value)
  const handleSetDate = (event) => setPhoneValue(event.target.value)
  const postNewPerson = async () => {
    try {
      fetch(personsUrl, {
        method: "POST",
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
    window.alert("You have added this person to the database.")
  }

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
        <button onClick={postNewPerson}>Create person</button>
      </ul>
    </div>
  )
}
export default NewPerson