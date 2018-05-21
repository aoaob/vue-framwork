<template>
  <nav id="navbar" class="navbar navbar-yiban" :class="{'NoHome navbar-yiban-hover':!site.IsHome}">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="leftbarbutton">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">
          <img alt="Brand" src="../images/logowhite.png" :title="site.SystemTitle">
        </a>
      </div>
      <button type="button" class="navbar-toggle collapsed" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <div class="collapse navbar-collapse" id="menu">
        <ul class="nav navbar-nav ge">
          <li v-for="item,index in menuLinks" :key="index" :class="{active:item.id==activeId}">
            <a :href="item.url" target="_blank">
              <i :class="item.class"></i>
              <span>{{item.text}}</span>
            </a>
          </li>
        </ul>
        <form method="POST" id="logoutForm" :action="site.logoffUrl" class="navbar-right" v-if="site.IsAuthenticated">
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <img v-if="site.CurrentUserInfo.UserImg.length>0" :src="site.CurrentUserInfo.UserImg" style="width:30px;height:30px;" />
                 {{site.CurrentUserInfo.UserTrueName.length>0?site.CurrentUserInfo.UserTrueName:site.CurrentUserInfo.UserName}}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li v-if="site.IsAdmin">
                  <a href="/Manage/">系统管理</a>
                </li>
                <li role="separator" class="divider" v-if="site.IsAdmin"></li>
                <li>
                  <a href="http://www.yiban.cn" target="_blank">进入易班</a>
                </li>
                <li>
                  <a href="/" target="_blank">辽宁易班</a>
                </li>
                <li role="separator" class="divider"></li>
                <li>
                  <a href="javascript:document.getElementById('logoutForm').submit()">
                    {{site.CurrentUserInfo.UserTrueName}} 注销
                  </a>
                </li>
              </ul>
            </li>

          </ul>
        </form>
        <ul class="nav navbar-nav navbar-right" v-else>
          <li>
            <a href="http://www.yiban.cn/user/reg/index?type=baseinfo" target="_blank" id="registerLink">注册</a>
          </li>
          <li>
            <a :href="site.loginUrl" target="_blank" id="loginLink">登录</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>
<script>
export default {
  name: 'navbar',
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
      activeId: 0
    }
  }
}
</script>
