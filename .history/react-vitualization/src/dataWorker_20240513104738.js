// dataWorker.js

import { faker } from "@faker-js/faker";

// Generate data array in a web worker
const generateDataArray = (size) => {
  const data = Array.from({ length: size }, (_, index) => ({
    id: index,
    name: faker.person.firstName(),
    email: faker.internet.email(),
    job: faker.person.jobTitle(),
    money: faker.finance.amount(),
  }));

  console.log('data', data)
  return data;
};

// Listen for messages from the main thread
self.onmessage = (event) => {
  const { size } = event.data;
  const data = generateDataArray(size);
  // Send the generated data array back to the main thread
  self.postMessage(data);
};
