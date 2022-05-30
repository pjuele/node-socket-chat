var socket = io();

var messages = document.getElementById('messages');
console.dir(messages);

socket.on('connect', () => {
    socket.emit('sign-in', "webMonitor");
});

socket.on('chat message', function (msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
