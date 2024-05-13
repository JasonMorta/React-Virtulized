import { useEffect, useState } from 'react';
import List from 'react-virtualized/dist/commonjs/List';
//import Worker from "./data.worker"
import WebWorker from "react-webworker"



export default function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date);

  useEffect(() => {
    // const myWorker = new Worker();
    // console.log('myWorker', myWorker)
    // myWorker.postMessage('start');// send message to worker
    // myWorker.onmessage = (e) => {
    //   console.log(e.data)
    // }; // listen to worker message


    // return () => {
    //   // Terminate the worker when component unmounts
    //  // worker.terminate();
    // };
  }, []);

  // useEffect(() => {
  //   // Create a new web worker
  //   const myWorker = new Worker('./worker.ts');

  //   // Set up event listener for messages from the worker
  //   myWorker.postMessage('start')

  //   // Save the worker instance to state
  //   //setWorker(myWorker);

  //   // Clean up the worker when the component unmounts
  //   return () => {
  //     myWorker.terminate();
  //   };
  // }, []); // Run this effect only once when the component mounts

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
  <WebWorker url="/worker.js" options={{ type: "module", credentials: "include" }}>
    </WebWorker>
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
   
    </>
  );
}

