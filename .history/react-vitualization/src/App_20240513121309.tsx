import { useEffect, useState } from 'react';
import List from 'react-virtualized/dist/commonjs/List';
import Worker from "./dataWorker"



export default function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date);

  useEffect(() => {
    const myWorker = new Worker();
    console.log('myWorker', myWorker)
    myWorker.postMessage('start');// send message to worker
    myWorker.onmessage = (e) => {
      console.log(e.data)
    }; // listen to worker message


    return () => {
      // Terminate the worker when component unmounts
     // worker.terminate();
    };
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

