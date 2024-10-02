const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

http.createServer((req, res) => {
  // Set the file path for the HTML file
  let filePath = path.join(__dirname, 'index.html');

  // Read the HTML file and serve it
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading page.');
    } else {
      // Serve the HTML file with proper headers
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    }
  });
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
