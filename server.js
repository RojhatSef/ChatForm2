const express = require('express')
const app = express();

// we set port to 3000 or it checkes for a port 
const PORT = 3000 || process.env.port; 
// app listens to port, and gives us a messege log in console when it runs 
app.listen(PORT, ()=> console.log(`server running on ${PORT}`)); 