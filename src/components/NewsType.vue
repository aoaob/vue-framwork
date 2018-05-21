<template>
  <ul class="news-type" id="news-type">
    <li v-for="item,index in lists" :key="index" :class="{'active':item.Id==currenId}">
        <slot v-bind="item"></slot>
    </li>
</ul>
</template>
<script>
export default {
  name: 'NewsType',
  props: {
    lists: {
      type: Array,
      default: () => {
        return []
      }
    },
    currenId: {
      type: Number,
      default: () => { return 0 }
    }
  },
  data () {
    return {}
  }
}
</script>
