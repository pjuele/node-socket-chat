var express = require('express');
var app = express(); // only really needed if the server has a web front-end. Else socket.io is enough!
app.use(express.static('public'));
// If anyone looks at server-url:3000 we send them the "web console" page.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/webConsole.html');
});

var server = app.listen(3000, () => {
    console.log('listening for webConsole requests on *:3000');
}); // start the web server AND
// pull http server out of the express app ovject so io can use it
// If there was no server web front-end (just socket listening)
// we could just initialise the socket.io object passing in the
// port and options instead of server object and options!


// options object will be used to tell socket.io to accept requests
// from the urls specified (preventing CORS issues for the clients)
const options = {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
};
// TO DO: Not sure how this works if we have clients with dynamic uris!

const users = new Map(); // we will store socket ids + user names here

// Initialise the socket handler object:
const io = require("socket.io")(server, { cors: options });

// Initialise the different socket event-listeners:
// We only do this if there's a connection.
// (that is, it's all triggered by an initial 'connect' event)
io.on('connection', (socket) => {
    console.log(`New socket opened! [${socket.conn.id}]`);
    // Initialise the names array with empty name (but valid socket id):
    users.set(socket.conn.id, "new user");

    // New user sent 'sign-in' message:
    socket.on('sign-in', (name) => {
        console.log(`User @ socket [${socket.conn.id}]sent in their name! (${name})`);
        users.set(socket.conn.id, name);
        console.dir(users);
    })

    // Signed-in user sent a chat message:
    socket.on('chat message', (msg) => {
        const line = `[${users.get(socket.conn.id)}] : ` + msg;
        console.log("MESSAGE " + line);
        io.emit('chat message', line);
    });

    // Signed-in user disconnected (i.e. closed browser window, or refreshed page thus reconnecting):
    socket.on('disconnect', () => {
        const id = socket.conn.id;
        console.log('user disconnected');
        users.delete(id);
        console.dir(users);
    });

});

