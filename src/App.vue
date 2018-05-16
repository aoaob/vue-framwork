<template>
  <header>
    {{welcome}}
  </header>  
</template>
<style lang="less">
body{
  background: #00ff00;
}
</style>
<script>
export default {
  name: "App",
  data() {
    return {
      welcome: "欢迎来到vue的开发世界，这里将是一片广阔的天地"
    };
  },
  mounted:function(){
  }
};
</script>