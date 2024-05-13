import { useEffect, useState } from 'react';
import List from 'react-virtualized/dist/commonjs/List';

function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date);


  
  useEffect(() => {
    setLoading(true);

    // Use Web Worker to generate data in the background
    const worker = new Worker(new URL('./worker.js', import.meta.url));
    worker.postMessage({ count: 500000 });

    worker.onmessage = (event) => {
      setPeople(event.data);
      setLoading(false);
    };

    // Clean up worker when component unmounts
    return () => worker.terminate();
  }, []);

  useEffect(() => {
    // Update the first person's money every 5 seconds
    // const interval = setInterval(() => {
    //   setPeople((prevPeople) => {
    //     const newPeople = [...prevPeople];
    //     newPeople[0].money = faker.finance.amount();
    //     newPeople[50].money = faker.finance.amount();
    //     newPeople[500].money = faker.finance.amount();
    //     return newPeople;
    //   });
    // }, 1000);
    //return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setTime(new Date);
    }, 1000);
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
