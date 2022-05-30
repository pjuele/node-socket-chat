# node-socket-chat

This contains both the server (node/express + socket.io) and the static client (HTML/JS) for a minimal chat app I made with the purpose of learning how to use socket.io.

The code is pretty simple so you can use it for that too.

it contains two subfolders:
1. server
2. client

Clone it to a local folder and to run you need to:

run the *server* from the **/server** folder using i.e.:
    nodemon server.js

run the *client* using i.e. *Live Server* from *Visual Studio Code* (it's just a static HTML/JS page).

Be aware that they both must run in localhost, and the *client* must run in port **5500** (that's the port used by Live Server, at least for me).

> **If you serve the static files in a different port**, make sure to update that in the CORS options object in */server/server.js*