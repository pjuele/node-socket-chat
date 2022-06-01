<template>
  <div id="app" class="">
    <ChatHeader :user="user" :connected="connected" />
    <ChatBox :user="user" />
    <ChatFooter :user="user" />
  </div>
</template>

<script>
import nicks from './assets/names.json' //assert {type: 'json'};

import ChatHeader from './components/ChatHeader.vue'
import ChatBox from './components/ChatBox.vue'
import ChatFooter from './components/ChatFooter.vue'
export default {
  name: 'App',

  components: {
    ChatHeader,
    ChatBox,
    ChatFooter
  },

  data() {
    return {
      connected: false,
      user: {
        name: null,
        avatar: null,
        mySocketId: 'unknown'
      }
    }
  },

  mounted: function () {
    console.log('mounted!', this.user.name, this.user.avatar);
    this.user.name = nicks[Math.round(Math.random() * nicks.length, 0)];
    this.user.avatar = 'av' + Math.round(Math.random() * 15 + 1);
    console.log('mounted!', this.user.name, this.user.avatar);
  },

  methods: {},
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Corben:wght@700&family=Rajdhani:wght@300;600&display=swap');

html,
body {
  font-family: 'Rajdhani', sans-serif;
}

#app {
  font-family: 'Rajdhani', sans-serif;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

#header-title {
  font-family: 'Corben', cursive;
}

.neumo {
  text-shadow: 2px 2px 4px #cccccc,
    -2px -2px 4px #ffffff;
}

.neumo-info {
  text-shadow: 2px 2px 4px #499ab2,
    -2px -2px 4px #6de6ff;
}

.neumo-box-info {
  background: linear-gradient(135deg, #64d3f4, #52adc8);
  box-shadow: 5px 5px 8px #50a9c3,
    -5px -5px 8px #66d7f9;
}

.neumo-pressed-white {
  background: #ffffff;
  box-shadow: inset 3px 3px 7px #b0b0b0,
    inset -3px -3px 7px #ffffff;
}
</style>
