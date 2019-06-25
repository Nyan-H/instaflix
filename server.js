const http = require('http'),
  fs = require('fs'),
  url = require('url');

  http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello Node!\n');
  }).listen(8080);
  
  const url = require('url');
  var addr = 'http://localhost:8080/default.htm?year=2017&month=february';
  var q = url.parse(addr, true);

  if (q.pathname.includes('documentation')){
    filePath = (__dirname+ '/documentation.html');
  } else{
    filePath = 'index.html';
  }

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err) {
    if (err) {
      console.log(err);
    }
      else {
    console.log('Added to log.');
    }
  });


  ``