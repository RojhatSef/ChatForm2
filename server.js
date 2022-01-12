const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
// calling our clientscripts 
const formatMessage = require('./utils/messages'); 
const {userJoin, getCurrentUser} = require('./utils/users'); 
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
io.on('connection', socket => {//server listen to emit from joinRoom
  socket.on('joinRoom',({username, room}) =>{

    // we want our user to join our chat, with an id and username and what room he/she joins  
    const user = userJoin(socket.id, username, room); 
    socket.join(user.room);

//(2) emit messege of what we want to main
  // we send any kind of data through emit back and forth
 // emitting a message to our client when joining the server
 // emit to main and to single user
 socket.emit('message',formatMessage(botName,'Welcome to the dungeon chat')); 


 // when a user connects will broadcast to everyone except the user
 socket.broadcast.to(user.room).emit('message',formatMessage(botName, `${user.username} has joined the chat`)); 

  });

  // listen/catch for chatMessage post it on the server
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
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