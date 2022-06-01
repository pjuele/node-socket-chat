var express = require('express');


//_____________________________________________________
// Start of line for console logs:
const serverAppName = "Chat Server";
const
    log = (msg, event) => console.log("[ " + serverAppName + " : " + event + " ] " + msg),
    sep = () => console.log('·············································································');
const eventInit = "Init"

//_____________________________________________________
// If we are not in 'production' environment,
// we need to get environment vars from dotenv:

sep();
log(`NODE_ENV is '${process.env.NODE_ENV}'.`, eventInit);
if (process.env.NODE_ENV !== 'production') {
    log('Assuming developement environment - Using dotenv!', eventInit);
    sep();
    require('dotenv').config();
}

const SERVER_PORT = process.env.SERVER_PORT;
const origin = process.env.ALLOWED_CLIENTS.split(' ');
const methods = process.env.ALLOWED_METHODS.split(' ');


//_____________________________________________________
// Initialise Express App and middlewares:

var app = express(); // only really needed if the server has a web front-end. Else socket.io is enough!

app.use(express.static('public'));
// If anyone looks at server-url:SERVER_PORT we send them the "web console" page.

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/webConsole.html');
});

var server = app.listen(SERVER_PORT, () => {
    log(`listening for webConsole requests on *:${SERVER_PORT}`, eventInit);
    sep();
}); // start the web server AND
// pull http server out of the express app object so io can use it
// If there was no server web front-end (just socket listening)
// we could just initialise the socket.io object passing in the
// port and options instead of server object and options!


//_____________________________________________________
// Initialise Socket listener and socket event hooks:

// Socket channels:
const
    sockConnection = 'connection',
    sockSignIn = 'signIn',
    sockJoinedTheChat = 'joinedTheChat',
    sockChatMessage = 'chatMessage',
    socketDisconnect = 'disconnect',
    socketLeftTheChat = 'leftTheChat';

const users = new Map(); // we will store socket ids + user data here

// options object will be used to tell socket.io to accept requests
// from the urls specified (preventing CORS issues for the clients)
// TO DO: Not sure how this works if we have clients with dynamic uris!
const options = { origin, methods };

// Initialise the socket handler object:
const io = require("socket.io")(server, { cors: options });

// Initialise the different socket event-listeners:
// We only do this if there's a connection.
// (that is, it's all triggered by an initial 'connect' event)
io.on(sockConnection, (socket) => {

    log(`New client socket opened with id [${socket.conn.id}]`, sockConnection);
    // Initialise the names array with empty name (but valid socket id):
    users.set(socket.conn.id, null);

    // New user sent sockSignIn message:
    socket.on(sockSignIn, (user) => {
        log(`Socket [${socket.conn.id}] is ${user.name}`, sockSignIn);
        users.set(socket.conn.id, user);
        io.emit(sockJoinedTheChat, user);
    })

    // Signed-in user sent a chat message:
    socket.on(sockChatMessage, (msg) => {
        const userId = socket.conn.id;
        const user = users.get(userId);
        log(`${user.name} said '${msg}'`, sockChatMessage);
        io.emit(sockChatMessage, { msg, user });
    });

    // Signed-in user disconnected (i.e. closed browser window, or refreshed page thus reconnecting):
    socket.on(socketDisconnect, () => {
        const
            id = socket.conn.id,
            user = users.get(id);
        log(`${user.name} left the chat.`, socketDisconnect);
        io.emit(socketLeftTheChat, user);
        users.delete(id);
    });
});
