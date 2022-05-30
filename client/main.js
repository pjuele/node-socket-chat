import nicks from './names.json' assert {type: 'json'};

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var nick = document.getElementById('nick');

//const nicks = require('./names.json'); //['Juan', 'Shilpa', 'Jerome', 'Pluto', 'Maria', 'Shadow', 'Bubba'];

nick.value = nicks[Math.round(Math.random() * nicks.length, 0)];

// We set a random background color to tell users apart when testing:
const r = Math.round(Math.random() * 255, 0);
const g = Math.round(Math.random() * 255, 0);
const b = Math.round(Math.random() * 255, 0);
document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

// Connect to the socket server (using server url):
const socket = io('http://127.0.0.1:3000');

// Socket event handlers:

// Event: Connection successful:
socket.on('connect', () => {
    console.log('CONNECTED!');
    console.log(`my id is [${socket.id}] and my name is ${nick.value}\n\n`);
    socket.emit('sign-in', nick.value);
})

// Event: Message received from server (no matter if this or another client sent it):
socket.on('chat message', function (msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

// Plain JS event handler for the input box (form submit):
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        // Send the message to the socket connection:
        // (and to other users, via the server)
        socket.emit('chat message', input.value);
        input.value = '';
    }
});
