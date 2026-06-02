const http = require('http');
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/documents',
  method: 'GET',
};
const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    console.log(data);
  });
});
req.on('error', (err) => {
  console.error('ERR', err.message);
});
req.end();
