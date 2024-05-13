import { useEffect, useState } from 'react';
import { faker } from "@faker-js/faker";
import './App.css';
import List from 'react-virtualized/dist/commonjs/List';

type Person = { id: number, name: string, email: string, job: string }



function App() {
  const [people, setPeople] = useState([] as Person[]);
  const [time, setTime] = useState(new Date);

  useEffect(() => {
    // Generate data array
    const data = [...Array(100).keys()].map((key) => ({
      id: key,
      name: faker.person.firstName(),
      email: faker.internet.email(),
      job: faker.person.jobTitle(),
    }));

    // Update state with the generated data
    setPeople(data);
  }, []);


  useEffect(() => {

    // Update the time every second
    const interval = setInterval(() => {
      setTime(new Date);
    }, 1000);

    // Clear the interval when the component is unmounted
    // This is required to prevent memory leaks that can lead to performance issues
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <h3>React Virtualization</h3>
        <p>Time: {time.toLocaleTimeString()}</p>
        <List 
        width={1000}
        height={800} 
        rowCount={people.length} 
        rowHeight={50} 
        rowRenderer={({ index, key, style }) => {
          const person = people[index];
          return (
            <div key={key} style={style}>
              <p>{person.name}</p>
              <p>{person.email}</p>
              <p>{person.job}</p>
              <hr />
            </div>
          );
        }} />
        {/* {people.map((person:Person) => (
          <div key={person.id}>
            <p>{person.name}</p>
            <p>{person.email}</p>
            <p>{person.job}</p>
            <hr />
          </div>
        ))} */}
      </div>
    </>
  );
}

export default App;
