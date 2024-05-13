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
export default {
    //receive message from main thread
    onmessage =  function (msg) {
        console.log('msg received⚡')


        postMessage('Hello from worker')

    }
}