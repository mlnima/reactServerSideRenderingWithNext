let users = []

const userJoin = (socketId,roomName,username,userId)=>{
    // const findExistingUser = users.find(u=>u.socketId !== socketId)
    // if(!users.find(u=>u.socketId !== socketId)){
    //     users = [...users,{socketId,userId,username,roomName}]
    // }
    users = [...users,{socketId,userId,username,roomName}]
    return users
}

const userLeave = (socketId)=>{
    users = users.filter(u=>u.socketId !== socketId)
    return users
}

const getUsersListOfRoom = (roomName) =>{
    return users.filter(u=>u.roomName === roomName)
}




module.exports = {userJoin,userLeave,getUsersListOfRoom}