const { message } = require("statuses");


// our emit from server we handle it here 
// whenever we get the messege event we send this paramter 
const socket = io(); 
socket.on('messege', message =>{
    console.log(message)
}); 