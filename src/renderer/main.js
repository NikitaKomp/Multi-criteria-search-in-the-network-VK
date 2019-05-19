import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'

import 'jquery'
import 'jquery-ui/themes/base//core.css';
import 'jquery-ui/themes/base//slider.css';
import 'jquery-ui/themes/base//theme.css';
import 'jquery-ui/ui/widgets/slider'
import 'bootstrap'
import './assets/styles/main.sass'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

let app = new Vue({
  components: {App},
  router,
  store,
  template: '<App/>',
}).$mount('#app')