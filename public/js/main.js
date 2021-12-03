const socket = io(); 
// our emit from server we handle it here 
// whenever we get the messege event we send this paramter 

socket.on('message', message =>{
    console.log(message); 
}); 