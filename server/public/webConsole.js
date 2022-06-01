var socket = io();

var messages = document.getElementById('messages');
console.dir(messages);

socket.on('connect', () => {
    socket.emit('signIn', "webMonitor");
});

socket.on('chatMessage', function (data) {
    var item = document.createElement('li');
    item.textContent = `[${data.user.name}] : ` + data.msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
