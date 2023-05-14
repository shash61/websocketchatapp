const express = require('express')
const app = express()
const http = require('http')
const socket = require('socket.io')
const { newUser, getAllUsersInRoom, exitRoom, getActiveUser } = require('./utilities/userHelper')

const server= http.createServer(app)
const io=socket(server)
const {formatMessage}= require('./utilities/messageFormat')
const path = require('path')


app.use(express.static(path.join(__dirname,'public')))

io.on('connection',(socket)=>{
  socket.on('joinRoom',(reqUser)=>{
    const user = newUser(socket.id, reqUser.name,reqUser.room)
    socket.join(user.room)
    // sending this message to client
    socket.emit('message', formatMessage("airtribe","Messages on this channel are limited to this room"))
    // broadcasting message to whole room
    socket.broadcast.to(user.room).emit('message',formatMessage("airtribe",`${user.name} has joined the room`))
    io.to(user.room).emit('roomUsers',{
      room: user.room,
      users: getAllUsersInRoom(user.room)
    })
  })

  socket.on('chatMessage',(msg)=>{
    const user = getActiveUser(socket.id)
    io.to(user.room).emit('message',formatMessage(user.name,msg))
  })

  socket.on('disconnect',()=>{
    const user = exitRoom(socket.id)
    if(user){
      io.to(user.room).emit('message', formatMessage('Airtribe', `${user.name} has left room`))
    }

    io.to(user.room).emit('roomUsers',{
      room:user.room,
      users: getAllUsersInRoom(user.room)
    })
  })
})

server.listen(5500, ()=>{
  console.log('listening on 5500')
})

