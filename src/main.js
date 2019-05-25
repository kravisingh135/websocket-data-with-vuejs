import Vue from 'vue'
import App from './App.vue'
import Socket from './socket'
import moment from 'moment'

Vue.prototype.moment = moment

Vue.config.productionTip = false

// let count = 0

setInterval(() => {
  Socket.send("Message Number")
}, 1000)

new Vue({
  render: h => h(App),
}).$mount('#app')
