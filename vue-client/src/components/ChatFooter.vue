<template>
    <div id="chat-footer" class="footer">
        <div class="container">
            <div class="mb-3 text-end pe-1">
                <a href="https://pablojuele.com" target="_blank" class="fs-5 text-white text-decoration-none neumo"
                    style="color: #bbb !important;">
                    &copy; 2022
                    <img src="https://res.cloudinary.com/wdpj/image/upload/c_scale,q_auto,w_25/v1636746639/web-design-pablo-juele/logos/wdpj-logo_ddlpop.jpg"
                        class="ms-1 shadow rounded" alt="Web Design Pablo Juele">
                </a>
            </div>
            <div class="row bg-info p-3 mb-5 rounded shadow">
                <div class="col-10">
                    <input type="text" @keyup.enter="sendTypedMessage()" id="msgInputBox"
                        placeholder="Write a message..."
                        class="p-2 ps-3 w-100 border-0 bg-white neumo-pressed-white rounded">
                </div>
                <div class="col">
                    <button @click="sendTypedMessage()" class="btn btn-dark fw-bold w-100">Send</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
#chat-footer {
    position: fixed;
    width: 100%;
    bottom: 0;
}
</style>

<script>
export default {
    props: {
        user: Object // passed down from parent
    },

    data() {
        return {}
    },

    methods: {
        sendTypedMessage() {
            const
                msgInputBox = document.getElementById('msgInputBox'),
                msg = msgInputBox.value;
            this.$socket.emit('chatMessage', msg);
            msgInputBox.value = '';
            msgInputBox.focus();
        }
    }

}
</script>