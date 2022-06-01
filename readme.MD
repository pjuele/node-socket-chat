[![Web Design Pablo Juele](https://res.cloudinary.com/wdpj/image/upload/c_scale,q_auto,w_100/v1636746639/web-design-pablo-juele/logos/wdpj-logo_ddlpop.jpg)](https://pablojuele.com)



# node-socket-chat

This contains both the server (node/express + socket.io) and two examples of clients for a minimal chat app I made with the purpose of learning how to use socket.io (and while I was at it, learning a bit of Vue).

The code is pretty simple so you can use it for that too.

it contains three subfolders:
1. server (Node.js backend)
2. client (very simple, static client in plain HTML/JS)
3. vue-client (self explanatory)

Clone it to a local folder, and to run you need to:

run the *server* from the **/server** folder using i.e.:
    nodemon server.js

run the *client* using i.e. *Live Server* from *Visual Studio Code* (it's just a static HTML/JS page).

run the *vueclient* from the **/vue-client** folder using:
    npm run serve

Be aware that as of this simple version, they both must run in localhost, and the *client* must run in port **5500** (that's the port used by Live Server, at least for me). The Vue client should run in port **8080**

> **If you serve the static files in a different port**, make sure to update that in the .env file of the **/server** Node folder (so the Node server can add CORS options tho whitelist those origins - you can see how that's done inside **server.js**)

![Screenshot](https://res.cloudinary.com/wdpj/image/upload/v1654042828/node-socket-chat/Screen_Shot_2022-05-31_at_17.02.48.png)
