const roomName= document.getElementById("groupName")
const userList = document.getElementById("users")
const msgContainer = document.getElementById("messages")
const form = document.getElementById("form")
const exitBtn=document.getElementById("exit")
const queryString = location.search
const urlParams = new URLSearchParams(queryString)

const name = urlParams.get('name')
const room = urlParams.get('group')

console.log(name,room)

const socket = io()

socket.emit('joinRoom',({name,room}))

socket.on('roomUsers',({room, users})=>{
  outputRoomName(room)
  outputUsers(users)
})

socket.on("message",(message)=>{
  outputMessage(message)
})

exitBtn.addEventListener('click',(()=>{
  const res = prompt("Are you sure")
  if(res.toLocaleLowerCase()==="yes"){
    window.location='index.html'
  }
}))


form.addEventListener('submit',((e)=>{
  e.preventDefault()
 console.log(e.target.input.value)
 if(e.target.input.value.length==0){
  return
 }
 socket.emit('chatMessage',e.target.input.value)
}))

function outputMessage(msg){
  console.log(msg)
  const msgDiv = document.createElement('div')
  const div = document.createElement('div')
  const p = document.createElement('p')
  p.innerText= msg.name
  p.innerHTML+=`<span>${msg.time}</span>`
  div.appendChild(p)
  const para=document.createElement('p')
  para.innerText=msg.text
  div.appendChild(para)
  msgContainer.appendChild(msgDiv.appendChild(div))

}

function outputRoomName(room){
  roomName.innerText=room
}
function outputUsers(users){
  userList.innerHTML=""
  users.forEach((user)=>{
    const li =document.createElement('li')
    li.innerText=user.name
    userList.appendChild(li)
  })

}