import { useEffect, useState } from 'react';
import List from 'react-virtualized/dist/commonjs/List';
import { Table, Column, SortDirection } from 'react-virtualized/dist/commonjs';

import 'react-virtualized/styles.css'; // Import CSS for table styles
import './App.css';

function App() {
  const [people, setPeople] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState(SortDirection.ASC);


  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date);
  const [status, setStatus] = useState('Loading...');
  let connectionAttempts: number = 0;

  // Function to handle sorting
  const sort = ({ sortBy, sortDirection }) => {
    setSortBy(sortBy);
    setSortDirection(sortDirection);
    // Implement sorting logic here based on sortBy and sortDirection
    // Example sorting logic:
    const sortedPeople = [...people].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortDirection === SortDirection.ASC ? valueA - valueB : valueB - valueA;
      } else {
        const stringA = String(valueA).toUpperCase();
        const stringB = String(valueB).toUpperCase();
        return sortDirection === SortDirection.ASC ? stringA.localeCompare(stringB) : stringB.localeCompare(stringA);
      }
    });
    setPeople(sortedPeople);
  };

  //! Worker logic
  // useEffect(() => {
  //   setLoading(true);

  //   // Use Web Worker to generate data in the background
  //   const worker = new Worker(new URL('./worker.js', import.meta.url));
  //   worker.postMessage({ 
  //     size: 50000,
  //     faker: {
  //       id: 'index',
  //       name: faker.person.firstName(),
  //       email: faker.internet.email(),
  //       job: faker.person.jobTitle(),
  //       money: faker.finance.amount(),
  //     }
  //   });

  //   worker.onmessage = (event) => {
  //     console.log('message from worker✅')
  //     console.log('event', event)
  //     setPeople(event.data);
  //     setLoading(false);
  //   };

  //   // Clean up worker when component unmounts
  //   return () => worker.terminate();
  // }, []);


  //! Fetch user data
  useEffect(() => {

    console.log('fetching data1️⃣')
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3003/accountSummaryStream');
        console.log('response⚡', response)
        const data = await response.json();
        console.log('data', data)
        console.log('Got data2️⃣')

        setTimeout(() => {
          console.log('updating table3️⃣')
          setPeople(data);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.log('Error fetching data🚨:', error);
        if (error instanceof Error && error.message.includes('Failed to fetch')) {

          setStatus('Connection Error!');

          if (connectionAttempts < 3) {
            setTimeout(() => {
              setStatus('Retrying...');
            }, 2000);

            setTimeout(() => {
              setStatus('Loading...');
              connectionAttempts++;
              fetchData();
            }, 4000);
          } else {
            setStatus('Failed to connect to the server!');
          }

        }
      }
    };
    fetchData();
  }, []);



  const handleRowClick = ({ event, index, rowData }) => {
    console.log('Clicked row data:', rowData);
  };

  //! Update time every second
  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setTime(new Date);
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  return (
    <>
      <section className='timer'>
        <h3>React Virtualization</h3>
        <p>{time.toLocaleTimeString()}</p>
      </section>
      {loading ? (
        <h1>{status}</h1>
      ) : (
        <div>
          <h3>{people.length} users accounts</h3>
          <Table
            width={1000}
            height={600}
            headerHeight={40}
            rowHeight={50}
            rowClassName="rowHover" // Apply the row hover effect
            rowCount={people.length}
            rowGetter={({ index }) => ({
              id: index,
              ...(people[index] as object), // Explicitly type the spread object as an object type
            })}
            onRowClick={handleRowClick}
            sortBy={sortBy}
            sortDirection={sortDirection}
            sort={sort}
          >





            {/* columns based of the example object */}
            <Column label="ID" dataKey="id" width={100} />
            <Column label="Name" dataKey="name" width={200} />
            <Column label="Email" dataKey="email" width={200} />
            <Column label="Phone" dataKey="phone" width={200} />
            <Column label="City" dataKey="city" width={200} />
            <Column label="Country" dataKey="country" width={200} />
            <Column label="State" dataKey="state" width={200} />
            <Column label="Street" dataKey="street" width={200} />
            <Column label="Zip" dataKey="zip" width={200} />
            <Column label="Password" dataKey="password" width={200} />



          </Table>
        </div>
      )}
    </>
  );
}

export default App;
