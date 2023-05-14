const joinButton = document.querySelector('button')
const joinGroupForm = document.getElementById("form")
const nameField = document.getElementById("myname")
const groupField = document.getElementById("groups")

joinGroupForm.addEventListener('submit',((e)=>{
  e.preventDefault()
 console.log('submit')
 console.log(nameField.value)
 console.log(groupField.value)
 window.location=`chat.html?name=${nameField.value}&group=${groupField.value}`
}))

