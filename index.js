const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});let login_users = {
      
}; //participant management

io.on('connection', (socket) => {


  //entry processing 

  socket.on('enter room', (nickname) => {

    login_users[socket.id] = nickname;

    socket.broadcast.emit('newcomer joined', login_users[socket.id]); 

  });


  //exit processing 

  socket.on('disconnect', () => {

    socket.broadcast.emit('user disconnect', login_users[socket.id]); 

  });


});
 