import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/global.css'
import '@/assets/css/icon.css'
import VipmroWebui from 'vipmro-webui'
import 'vipmro-webui/lib/theme-chalk/index.css'
import '@/assets/styles/classics.css'
import qs from 'querystring'

import globalFunc from '@/global.js'

import * as custom from '@/assets/filter/global'

Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

Vue.use(VueAxios, axios)
Vue.prototype.$qs = qs

Vue.config.productionTip = false;

Vue.use(VipmroWebui)
Vue.use(globalFunc);

router.beforeEach( (to, from, next) => {
  store.commit('setCurrRouteNme', {currRouteNme:to.name});
  store.dispatch('setMenuList').then( ()=> {
    store.dispatch('setBreadCrumb');
  });
 
  next();
}) 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

