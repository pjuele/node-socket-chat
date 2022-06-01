<template>
    <div class="chat-box-container container text-start p-5">
        <div v-if="isConnected" class="badge bg-success m-2 shadow">You are connected!</div>
        <div v-for="(line, index) in this.lines" :key="index" class="p-2">
            <b-avatar variant="info" class="shadow text-start"
                :src="'https://res.cloudinary.com/wdpj/image/upload/c_scale,w_100/v1653938338/node-socket-chat/avatars/' + line.user.avatar + '.jpg'">
            </b-avatar>
            &nbsp;
            <div v-if="!line.system" class="fs-6 badge bg-info shadow m-0">
                {{ line.user.name }}
            </div>
            <div :class="line.system ? 'fs-7 badge bg-info m-0 shadow' : 'fs-6 badge bg-white text-black shadow m-2'">{{
                    line.msg
            }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: Object // passed down from parent
    },
    data() {
        return {
            lines: [],
            isConnected: false
        }
    },

    sockets: {
        connect() {
            // Fired when the socket connects.
            this.isConnected = true;
            console.dir(this.user);
            this.$socket.emit(
                'signIn',
                {
                    name: this.user.name,
                    socketId: this.$socket.id,
                    avatar: this.user.avatar
                })
        },

        disconnect() {
            this.isConnected = false;
        },

        // Fired when the server sends something on the "chat message" channel.
        chatMessage(data) {
            const { msg, user } = data;
            this.lines.push({ msg, user, system: false });
        },

        joinedTheChat(user) {
            this.lines.push({ msg: `${user.name} has joined the chat!`, user, system: true });
        },

        leftTheChat(user) {
            this.lines.push({ msg: `${user.name} has left the chat!`, user, system: true });
        }
    },

    // mounted() {
    //     console.dir(this.socket);
    //     this.$socket.subscribe("chat message", function (data) {
    //         console.log("Chat message event triggered - ", data);
    //     })
    // }
}
</script>