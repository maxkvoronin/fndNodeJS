const http = require('http');
const fs = require('fs');
const gzip = require('zlib');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST',
  headers: {
    'filename': 'data.txt',
    'Content-Type': 'application/gzip',
    'Content-Encoding': 'gzip'
  }
};

const req = http.request(options, res => {
  console.log('Server response: ' + res.statusCode);
});

fs.createReadStream('input_data.txt')
  .on('error', err => {
    console.error(err.stack);
  })
  .pipe(gzip.createGzip())
  .pipe(req)
  .on('finish', () => {
    console.log('File successfully sent');
  });
