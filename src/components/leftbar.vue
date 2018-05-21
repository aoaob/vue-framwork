<template>
  <div class="leftbar">
    <div class="title">
      <div class="navbar-header">
        <button type="button" class="leftbarbutton">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">
          <img alt="Brand" src="../images/logocolor.png" :title="site.SystemTitle">
        </a>
      </div>
    </div>
    <dl>
      <dd v-for="item,index in leftMenu" :key="index">
        <a href="http://www.yiban.cn">
          <i class="fa fa-home"></i>
          <span>{{item.text}}</span>
        </a>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'leftbar',
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
    leftMenu: {
      type: Array,
      default: () => {
        return [
          {
            id: 0,
            text: '易班首页',
            url: 'http://www.yiban.cn',
            class: 'fa fa-home'
          },
          {
            id: 1,
            text: '易班首页',
            url: 'http://www.yiban.cn',
            class: 'fa fa-home'
          }
        ]
      }
    }
  },
  data () {
    return {}
  }
}
</script>
