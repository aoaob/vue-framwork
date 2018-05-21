import Vue from '../util/util'
import info from '../views/info.vue'

let vm = new Vue({
  el: '#app',
  render: h => h(info)
})

Vue.use({
  vm
})
