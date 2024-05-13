import { useEffect, useState } from 'react';
import { faker } from "@faker-js/faker";
import './App.css';
import List from 'react-virtualized/dist/commonjs/List';

type Person = { id: number, name: string, email: string, job: string, money: string}

function App() {
  const [people, setPeople] = useState([] as Person[]);
  const [time, setTime] = useState(new Date);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log('loading', loading)
    
    // Generate data array
   setTimeout(() => {
    const data = [...Array(500000).keys()].map((key) => ({
      id: key,
      name: faker.person.firstName(),
      email: faker.internet.email(),
      job: faker.person.jobTitle(),
      money: faker.finance.amount()
    }));

    console.log(data);
   }, 1000);
    console.count('App rendered');
    // Update state with the generated data
    setPeople(data);
  }, []);

  useEffect(() => {
    if (people.length > 0) {
      setLoading(false); // Switch loading to false once people array is populated
    }
  }, [people]);

  //update teh first person age every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPeople((prevPeople) => {
        const newPeople = [...prevPeople];
        newPeople[0].money = faker.finance.amount();
        newPeople[50].money = faker.finance.amount();
        newPeople[500].money = faker.finance.amount();
        return newPeople;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setTime(new Date);
    }, 1000);
    console.count('App component rendered');
    // Clear the interval when the component is unmounted
    // This is required to prevent memory leaks that can lead to performance issues
    return () => clearInterval(interval);
  }, []);

  return (
    <>
       {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h3>React Virtualization</h3>
          <p>Time: {time.toLocaleTimeString()}</p>
          <List 
            width={1000}
            height={700} 
            rowCount={people.length} 
            rowHeight={200} 
            rowRenderer={({ index, key, style }) => {
              const person = people[index];
              return (
                <div key={key} style={style} >
                  <b>{index}</b>
                  <p>{person.name}</p>
                  <p>{person.email}</p>
                  <p>{person.job}</p>
                  <p>{person.money}</p>
                  <hr />
                </div>
              );
            }} />
        </div>
      )}
    </>
  );
}

export default App;
