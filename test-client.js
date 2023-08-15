const axios = require('axios');

const urls = [
  'http://20.244.56.144/numbers/primes',
  'http://20.244.56.144/numbers/fibo',
  'http://20.244.56.144/numbers/odd'
];

async function sendRequest() {
  const startTime = new Date();
  try {
    const response = await axios.get('http://localhost:8008/numbers', {
      params: { url: urls }
    });

    const endTime = new Date();
    const elapsedTime = endTime - startTime;

    console.log('Request:');
    console.log(`GET http://localhost:8008/numbers?url=${urls.join('&url=')}`);
    console.log('');

    console.log('Response:');
    console.log(response.data);
    console.log('');

    console.log('Response Time:');
    console.log(`${elapsedTime} ms`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

sendRequest();
