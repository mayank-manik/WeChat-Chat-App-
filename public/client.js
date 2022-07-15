const socket = io()

let username;
let textarea = document.getElementById('textarea')
let btn = document.querySelector('.btn')
let message_area = document.querySelector('.message_area')

do {
    username = prompt('Enter yout name')
} while (!username)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
        e.target.value = ''
        scrollToBottom();
    }
})

btn.addEventListener('click', () => {
    sendMessage(textarea.value);
})

// send messages

function sendMessage(msg) {
    let message = {
        user: username,
        message: msg.trim()
    }

    appendMessage(message, 'outgoing')
    textarea.value='';

    // send to server
    socket.emit('message',message)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add('message', className);

    let markUp = `<h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markUp;

    message_area.appendChild(mainDiv);
}

// receive messages

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrollToBottom();
})

function scrollToBottom() {
    message_area.scrollTop=message_area.scrollHeight;
}

