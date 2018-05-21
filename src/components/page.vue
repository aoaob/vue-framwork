<template>
  <div>
    <navbar :site="site" :menuLinks="menuLinks"></navbar>
    <div id="vue" :class="{'IsHome active':site.IsHome,'NoHome':!site.IsHome}">
      <leftbar></leftbar>
      <slot></slot>
      
      
    </div>
  </div>
</template>
<script>
import navbar from '../components/navbar.vue'
import leftbar from '../components/leftbar.vue'
export default {
  name: 'page',
  components: { navbar, leftbar },
  props: {
    site: {
      type: Object,
      default: () => {
        return {
          SystemTitle: '网站名称',
          IsAuthenticated: false,
          IsHome: true,
          IsAdmin: false,
          logoffUrl: '',
          CurrentUserInfo: {
            UserTrueName: '',
            UserImg: ''
          }
        }
      }
    },
    menuLinks: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>
