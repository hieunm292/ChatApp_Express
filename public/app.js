const socket=io()

const msgText=document.querySelector('#msg')
const btnSend=document.querySelector('#btn-send')
const chatBox=document.querySelector('.chat-content')
const displayMsg=document.querySelector('.message')

let name;
do{
    name=prompt('What is ur name ?')
}while(!name)

document.querySelector('#your-name').textContent=name
msgText.focus()

btnSend.addEventListener('click',(e)=>{
    e.preventDefault()
    sendMsg(msgText.value)
})

const sendMsg=message=>{
    let msg={
        user=name,
        message=message.trim()
    }

    socket.emit('sendMessage',msg)
}


socket.on('sendToAll', msg=>{
    display(msg, 'other-message')
})

const display=(msg, type)=>{
    const msgDiv=document.createElement('div')
    let className=type
    msgDiv.classList.add(className,'message-row')
    let time=new Date().toLocaleTimeString()

    let innerText=`
    <div class="message-title">
        😈<span>${msg.user}</span>
    </div>
    <div class="message-text">
         ${msg.message}
    </div>
    <div class="message-time">
         ${time}
    </div>
    `;
    msgDiv.innerHTML=innerText;
    displayMsg.appendChild(msgDiv)
}

