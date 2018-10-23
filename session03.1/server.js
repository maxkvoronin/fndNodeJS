const http = require('http');
const fs = require('fs');
const gzip = require('zlib');

const server = http.createServer( (req, res) => {
  const filename = req.headers.filename;
  console.log('File request received: ' + filename);

  req
    .on('error', err => {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Something going wrong');
      console.error(err.stack);
    })
    .pipe(gzip.Unzip())
    .pipe(fs.createWriteStream(filename))
    .on('finish', () => {
      res.writeHead(201, {'Content-Type': 'text/plain'});
      res.end('That\'s it\n');
      console.log('File saved: ' + filename);
    });
});

server.listen(3000,  () => {
  console.log('Listening');
});
