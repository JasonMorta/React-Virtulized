import { useEffect, useState } from 'react'
import { faker } from "@faker-js/faker"; 
import './App.css'


function App() {
  const [people, setPeople] = useState([])

  useEffect(() => {

    //create a new array of 1000 people
    [...Array(1000).keys()].map(key => {
      return {
        id: key,
        name: faker.firstName(),
      }
    })


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
