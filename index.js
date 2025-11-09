console.log("✅ Employee Management Node App is running...");

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Employee Management App is working!");
});

server.listen(3000, () => {
  console.log("✅ Server listening on port 3000");
});
