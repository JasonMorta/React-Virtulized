import { useEffect, useState } from 'react';
import { faker } from "@faker-js/faker";
import './App.css';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    // Generate data array
    const data = [...Array(1000).keys()].map((key) => ({
      id: key,
      name: faker.person.firstName(),
      email: faker.internet.email(),
      job: faker.person.jobTitle(),
    }));

    // Update state with the generated data
    setPeople(data);
  }, []);

  return (
    <>
      <div>
        <h3>React Virtualization</h3>
        {/* Render your virtualized list here */}
      </div>
    </>
  );
}

export default App;
