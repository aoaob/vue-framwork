import Vue from 'vue'
import { Button, Select, Loading } from 'element-ui'

import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use({
  Button, Select
})

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.use(VueAwesomeSwiper)
exports = module.exports = Vue
