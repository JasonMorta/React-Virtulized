import { useEffect, useState } from 'react';
import List from 'react-virtualized/dist/commonjs/List';
import { Table, Column } from 'react-virtualized/dist/commonjs';
import { faker } from "@faker-js/faker";
import 'react-virtualized/styles.css'; // Import CSS for table styles
import './App.css';

function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date);
  const [sortBy, setSortBy] = useState('id'); // State for the column to sort by
  const [sortDirection, setSortDirection] = useState('ASC'); // State for the sort direction



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

  // useEffect(() => {
  //   //Update the first person's money every 5 seconds
  //   const interval = setInterval(() => {
  //     setPeople((prevPeople) => {
  //       const newPeople = [...prevPeople];
  //       newPeople[0].money = faker.finance.amount();
  //       newPeople[50].money = faker.finance.amount();
  //       newPeople[500].money = faker.finance.amount();
  //       return newPeople;
  //     });
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  //! Fetch user data
  useEffect(() => {
    console.log('fetching data1️⃣')
    const fetchData = async () => {
      const response = await fetch('http://localhost:3003/initialUser');
      const data = await response.json();
      console.log('data', data)
      console.log('Got data2️⃣')
     
      setTimeout(() => {
        console.log('updating table3️⃣')
        setPeople(data);
        setLoading(false);
      }, 500);
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


// Handle sorting
const handleSort = ({ sortBy, sortDirection }) => {
  // Update state with sorting parameters
  setSortBy(sortBy);
  setSortDirection(sortDirection);
  // Custom sorting logic based on sortBy and sortDirection
  const sortedPeople = [...people];
  sortedPeople.sort((a, b) => {
    if (sortBy === 'name' || sortBy === 'email' || sortBy === 'phone' || sortBy === 'address') {
      // Handle sorting for string columns
      const aValue = typeof a[sortBy] === 'object' ? a[sortBy].city : a[sortBy];
      const bValue = typeof b[sortBy] === 'object' ? b[sortBy].city : b[sortBy];
      return sortDirection === 'ASC' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else if (sortBy === 'id' || sortBy === 'zip') {
      // Handle sorting for numerical columns
      return sortDirection === 'ASC' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    }
    // Add more conditions for other columns if needed
    return 0;
  });
  // Update state with sorted data
  setPeople(sortedPeople);
};


  return (
    <>
      <section className='timer'>
        <h3>React Virtualization</h3>
        <p>{time.toLocaleTimeString()}</p>
      </section>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>

          {/* Object example
          address: city: "West Vesta"
          country: "Dominica"
          state: "Delaware"
          street: "E Central Avenue"
          zip: "51299"
          [[Prototype]]: Object
          email: "Demetrius85@yahoo.com"
          name: "Micaela Bednar"
          password: "L840UCZvHqS1gu7"
          phone: "678-319-3837"
          */}

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
            sort={handleSort} // Pass the handleSort function for sorting
            sortBy={sortBy}
            sortDirection={sortDirection}
            >





            {/* columns based of the example object */}
            <Column label="ID" dataKey="id" width={100} disableSort={false}/>
            <Column label="Name" dataKey="name" width={200} disableSort={false}/>
            <Column label="Email" dataKey="email" width={200} disableSort={false}/>
            <Column label="Phone" dataKey="phone" width={200} disableSort={false}/>
            <Column
              label="City"
              dataKey="address"
              width={200}
              disableSort={false}
              cellDataGetter={({ rowData }) => rowData.address.city}
            />
            <Column
              label="Country"
              dataKey="address"
              width={200}
              disableSort={false}
              cellDataGetter={({ rowData }) => rowData.address.country}
            />
            <Column
              label="State"
              dataKey="state"
              width={200}
              disableSort={false}
              cellDataGetter={({ rowData }) => rowData.address.state}
            />
            <Column
              label="Street"
              dataKey="street"
              width={200}
              disableSort={false}
              cellDataGetter={({ rowData }) => rowData.address.street}
            />
            <Column
              label="Zip"
              dataKey="zip"
              width={200}
              disableSort={false}
              cellDataGetter={({ rowData }) => rowData.address.zip}
            />


          </Table>
        </div>
      )}
    </>
  );
}

export default App;
