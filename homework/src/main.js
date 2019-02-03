import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import Beard from '@/layout/beard.vue'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'



import '@/assets/css/index.css'
// import axios from 'axios'
// 引入element-ui的样式
import 'element-ui/lib/theme-chalk/index.css'
// axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
// Vue.prototype.$http = axios
import myaxios from '@/assets/js/mainaxios.js'
Vue.use(VueQuillEditor)

Vue.use(Element)
Vue.use(myaxios)
Vue.component(Beard.name, Beard)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
