import Vue from '../util/util'
import index from '../views/index.vue'
import $ from 'jquery'

let vm = new Vue({
  el: '#app',
  render: h => h(index)
})
Vue.use({
  vm
})
var newstype = function () {
  try {
    var left = $('#mainContent').offset().left
    var top = $('#mainContent').offset().top
    var scrollTop = $(window).scrollTop()
    // console.log(`${_height} ${left} ${top} ${scrollTop}`);

    top = top - scrollTop > 70 ? top - scrollTop : 70
    $('#news-type').css({ 'top': top + 'px', 'left': left + 'px' })
  } catch (err) {}
}
setInterval(newstype, 300)
var activeing = function () {
  if ($(window).scrollTop() > 20) {
    $('#navbar').addClass('navbar-yiban-hover')
  } else {
    $('#navbar').removeClass('navbar-yiban-hover')
  }

  $('.panel').each(function () {
    var $this = $(this)
    if (!$this.hasClass('active') && ($this.offset().top - $(window).scrollTop() < $(window).height() - 10)) {
      $this.addClass('active')
    } else {

    }
  })
  $('.animation').each(function () {
    var $this = $(this)
    if (!$this.hasClass('animationshow') && (($this.offset().top - $(window).scrollTop()) < ($(window).height() + 10))) {
      $this.addClass('animationshow')
    } else {
    }
  })
  // $('.loadingbutton').each(function () {
  //   var $this = $(this)
  //   if (!index.loading && ($this.offset().top - $(window).scrollTop()) < ($(window).height() + 200)) {
  //     index.methods.request()
  //   }
  // })
}
activeing()
$('#news-type').addClass('active')
$(window).scroll(activeing)
$(window).resize(activeing)
