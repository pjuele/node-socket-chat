<template>
    <div id="chat-header" class="container">
        <b-navbar type="dark" variant="info" class="row rounded shadow mt-2">
            <div class="col-9 neumo-info p-3 text-white text-start">
                <h1 id="header-title" class="ps-5 fs-1">Chatongo</h1>
                <p id="header-subtitle" class="ps-5">
                    · fancy · ass · vue · socket · chat · client ·
                </p>
            </div>
            <div class="col-2 p-2 bg-white neumo-pressed-white rounded">
                {{ user.name }}
                <!-- <b-icon v-if="connected" icon="plug-fill" :title="user.mySocketId" :alt="user.mySocketId"></b-icon>
                <b-icon v-else icon="plug"></b-icon> -->
            </div>
            <div class="col-1">
                <b-avatar variant="info" class="shadow text-start"
                    :src="'https://res.cloudinary.com/wdpj/image/upload/c_scale,w_100/v1653938338/node-socket-chat/avatars/' + user.avatar + '.jpg'">
                </b-avatar>
            </div>
        </b-navbar>
    </div>
</template>

<script>
export default {
    props: {
        user: Object,
        connected: Boolean
    }
}
</script>