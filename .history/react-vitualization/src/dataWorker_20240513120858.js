// dataWorker.js

// import { faker } from "@faker-js/faker";

// Generate data array in a web worker
// const generateDataArray = (size) => {
//      console.log('size', size)
//   const data = Array.from({ length: size }, (_, index) => ({
//     id: index,
//     name: faker.person.firstName(),
//     email: faker.internet.email(),
//     job: faker.person.jobTitle(),
//     money: faker.finance.amount(),
//   }));
//   return data;
// };

export const handleMessage = function(event) {
    console.log('msg received⚡');
    console.log('event', event);
    this.postMessage('Hello from worker');
};