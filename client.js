
const socket = io("http://localhost:8000");
console.log("script running")
const form = document.getElementById('send-container');
const messageInput = document.getElementById('msginput');
const messageContainer = document.querySelector(".screen")

function add(message, position) {
    const messageelement = document.createElement('div');
    const text = document.createElement('h4');
    messageelement.classList.add('messagebox')
    messageelement.classList.add(position)
    text.innerText = message
    messageelement.append(text)
    messageContainer.append(messageelement)
}


form.addEventListener('submit', e =>{
    e.preventDefault();
    const message = messageInput.value;
    add(`You: ${message}`, 'right');
    const msg = document.getElementById('msginput');
    msg.value = ''
    socket.emit('send', message);
})


const name = prompt("enter name pls")
console.log(name)
socket.emit('new-user-joined', name)

socket.on('user-joined', name => {
    add(`${name} joined the chat`, 'middle')
})

socket.on('receive', (data)=>{
    add(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name =>{
    add(`${name} left the chat`, 'middle')
})