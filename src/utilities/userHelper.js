const users = []

function newUser(id, name, room){
  const user = {id, name, room}
  users.push(user)
  return user
}

function getAllUsersInRoom(room){
  return users.filter(user=>user.room==room)
}

function exitRoom(roomId){
  const index = users.findIndex(user=>user.id===roomId)
  if(index!==-1){
    return users.splice(index,1)[0]
  }
}

function getActiveUser(id){
  return users.find(user=>user.id==id)
}

module.exports = {
  newUser,
  getAllUsersInRoom,
  exitRoom,
  getActiveUser
}