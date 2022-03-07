import Vue from 'vue'
import App from './App.vue'
import pubsub from 'pubsub-js'
Vue.use(pubsub)
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')