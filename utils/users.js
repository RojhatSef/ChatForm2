const users = [];

// join user to chatt

function userJoin(id, username,room){
    const user= {id, username,room};
    users.push(user);
    return(user)
}

// getting the  current user
function getCurrentUser(id){
    return users.find(user => user.id === id);
}

module.exports = {
    userJoin,
    getCurrentUser
};