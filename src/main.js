import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import '@/utils/vant-ui'
import { Button, Icon } from 'vant'

Vue.use(Button)
Vue.use(Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
