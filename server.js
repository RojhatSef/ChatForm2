const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages'); 

const app = express();
// setting upp our server to connect to socket.io directly
const server = http.createServer(app); 
// inizilizing io 
const io = socketio(server); 

// set our static folder to public 
app.use(express.static(path.join(__dirname, "public"))); 
const botName = "ChatBot Rojhat"; 
// run when a client connect to the server 
// (1) start of message
io.on('connection', socket => {
  socket.on('joinRoom',({username, room}) =>{

//(2) emit messege of what we want to main
  // we send any kind of data through emit back and forth
 // emitting a message to our client when joining the server
 // emit to main and to single user
 socket.emit('message',formatMessage(botName,'Welcome to the dungeon chat')); 


 // when a user connects will broadcast to everyone except the user
 socket.broadcast.emit('message',formatMessage(botName, 'New user has joined the chat')); 

  });

  

  // listen/catch for chatMessage post it on the server
  socket.on('chatMessage', (msg) =>{
    io.emit('message',formatMessage("", msg));  
    console.log(msg);
  });
  // emits when the client/user has disconnected from server 
  socket.on('disconnect', () =>{
    io.emit('message',formatMessage(botName, 'A user has left the chat ')); 
  });

}); 

// we set port to 3000 or it checkes for a port 
const PORT = 3000 || process.env.port; 
// we use server instead of app for listens to port, and gives us a message log in console when it runs 
server.listen(PORT, ()=> console.log(`server running on ${PORT}`)); 