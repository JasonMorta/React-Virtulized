import { useEffect, useState } from 'react'

import './App.css'
import { faker } from "faker"

function App() {
  const [people, setPeople] = useState([])

  useEffect(() => {

    //create a new array of 1000 people
    // [...Array(1000).keys()].map(key => {
    //   return {
    //     id: key,
    //     name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    //     age: Math.floor(Math.random() * 100),
    //     email: `
    // })


  }, [])

  return (
    <>
      <div>
      <h3>React Virtualization</h3>
      </div>
     
    </>
  )
}

export default App
