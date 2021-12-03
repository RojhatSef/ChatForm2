const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
// setting upp our server to connect to socket.io directly
const server = http.createServer(app); 
// inizilizing io 
const io = socketio(server); 

// set our static folder to public 
app.use(express.static(path.join(__dirname, "public"))); 
// run when a client connect to the server 
io.on('connection', socket => {

 
  console.log('New WS Connection...'); 

  // we send data through emit back and forth
 // emitting a message to our client when joining the server
  socket.emit('message', 'Welcome to the dungeon chat'); 
}); 

// we set port to 3000 or it checkes for a port 
const PORT = 3000 || process.env.port; 
// we use server instead of app for listens to port, and gives us a message log in console when it runs 
server.listen(PORT, ()=> console.log(`server running on ${PORT}`)); 