import React, { useState } from 'react'

const NewEvent = () => {
  const eventsUrl = "http://localhost:3003/api/events/"

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

  const postNewEvent = async () => {
    try {
      fetch(eventsUrl, {
        method: "POST",
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
    } catch (e) {
      console.log('Error: ', e)
    }
    window.alert("You have added this event to the database.")
  }

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
        <button onClick={postNewEvent}>Create event</button>
      </ul>
    </div>
  )
}

export default NewEvent