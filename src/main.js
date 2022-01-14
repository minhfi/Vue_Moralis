import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Moralis from 'moralis';
import './styles/common.css'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

/* Moralis init code */
const serverUrl = "https://eqrucuasvstd.usemoralis.com:2053/server";
const appId = "pFM7DOdAJmHONnG49NKwQznUW5lxU9vB1lKyyoAM";
Moralis.start({ serverUrl, appId });

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
