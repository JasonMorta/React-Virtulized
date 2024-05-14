onmessage = async (event) => {
  console.log('msg received⚡');
  console.log('event', event);

  // Make a fetch request
 await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  .then(response => response.json())
  .then(data => {
      // Pass the response back
      postMessage(data);
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });
};


  

