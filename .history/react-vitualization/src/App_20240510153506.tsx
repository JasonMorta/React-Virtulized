import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import faker from "faker"

function App() {
  const [people, setPeople] = useState([])

  useEffect(() => {

    //create a new array of 1000 people
    [...Array(1000).keys()].map(key => {
      return {
        id: key,
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        age: Math.floor(Math.random() * 100),
        email: `
    })


  }, [])

  return (
    <>
      <div>

     
      </div>
     
    </>
  )
}

export default App
