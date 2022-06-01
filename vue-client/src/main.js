import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

// Enable the vue-socket.io plugin in (this) startup file
export const SocketInstance = socketio('http://127.0.0.1:3000');
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketInstance
}))

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
    render: h => h(App),
}).$mount('#app')
