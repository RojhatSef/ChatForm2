// to post code to our front-end we grab the id and change the html 
const chatForm = document.getElementById('chat-form'); 
const socket = io(); 
// our emit from server we handle it here 
// whenever we get the messege event we send this paramter 
// (3) emit to the website our message

//message from server
socket.on('message', message =>{
    console.log(message); 
    outputMessage(message);
}); 
// we wait for the submit button to happen, when it happens we send our changes back to the server
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Get message text
    const msg = e.target.elements.msg.value;

    // emitting message to server
    socket.emit('chatMessage', msg);
    console.log(msg);
});

//output message to dom
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `${message}`; 
    document.querySelector('.chat-messages').appendChild(div); 
}