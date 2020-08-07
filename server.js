const http = require('http');
const app =require('./app');
const PORT = process.env.PORT || 3000;

console.log('In the server.js file ');

const server=http.createServer(app);

console.log('Server is created and listening to port');

server.listen(PORT);
 