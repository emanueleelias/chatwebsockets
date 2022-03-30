let socket = io();
let chatBox = document.getElementById("chatBox");
let log = document.getElementById('log');
let user;

//Alert de identificación - el Swal es una promesa
//Por eso se puede usar el .then
Swal.fire({
    title: "Identificate",
    input: "text",
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && 'Necesitas escribir un nombre de usuario para participar del chat!!!'
    }
}).then(result => {
    user = result.value;
})

chatBox.addEventListener('keyup', evt=>{
    if(evt.key==="Enter") {
        //Por lo menos se envia un caracter
        if(chatBox.value.trim().length>0){
            socket.emit('message', {user, message:chatBox.value.trim()});
            chatBox.value="";
        }
    }
})


//Sockets events
socket.on('log', data=>{
    let messages="";
    data.forEach(log => {
        messages = messages + `${log.user} dice: ${log.message}</br>`
    });
    log.innerHTML = messages;
})