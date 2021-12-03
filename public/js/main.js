// to post code to our front-end we grab the id and change the html 
const chatForm = document.getElementById('chat-form'); 
const socket = io(); 
// our emit from server we handle it here 
// whenever we get the messege event we send this paramter 
// (3) emit to the website our message
socket.on('message', message =>{
    console.log(message); 
}); 
// we wait for the submit button to happen, when it happens we send our changes back to the server
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Get message text
    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);
    console.log(msg);
});