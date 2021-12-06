// to post code to our front-end we grab the id and change the html 
const chatForm = document.getElementById('chat-form'); 
const socket = io(); 
const chatMessages = document.querySelector(".chat-messages"); 

Const {username,room } = Qs.parse(location.search {
    
}); 

// our emit from server we handle it here 
// whenever we get the messege event we send this paramter 
// (3) emit to the website our message

//message from server
// we print whatever we want on our server here, through message
socket.on('message', message =>{
    console.log(message); 
    outputMessage(message);

    //scroll for new messages
    chatMessages.scrollTop = chatMessages.scrollHeight; 
}); 
// we wait for the submit button to happen, when it happens we send our changes back to the server
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Get message text
    const msg = e.target.elements.msg.value;

    // emitting message to server
    socket.emit('chatMessage', msg);
    console.log(msg);

    // clearing inputs meaning our chatt input gets empty every time we write something
    e.target.elements.msg.value = ''; 
    e.target.elements.msg.focus(); 
});

//output message to dom

function outputMessage(message){
    //takes in message 
    const div = document.createElement('div');
    // adds the class of message
    div.classList.add('message');
    //dom manipulating our html to our 
    div.innerHTML = `<p class="text">${message.text}</p>`; 
    // we search for the form class of chat-messages and use it's container
    document.querySelector('.chat-messages').appendChild(div); 
}