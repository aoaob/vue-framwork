import $ from 'jquery'
// 判断当前字符串是否以str开始 先判断是否存在function是避免和js原生方法冲突，自定义方法的效率不如原生的高
if (typeof String.prototype.startWith !== 'function') {
  String.prototype.startWith = function (str) {
    return this.slice(0, str.length) === str
  }
}

// 判断当前字符串是否以str结束
if (typeof String.prototype.endWith !== 'function') {
  String.prototype.endWith = function (str) {
    return this.slice(-str.length) === str
  }
}

function log (msg) {
  console.log(msg)
}

var activeing = function () {
  $('.blur').each(function () {
    var $this = $(this)
    if (!$this.hasClass('active') && ($this.offset().top - $(window).scrollTop() < $(window).height() - 10)) {
      var self = $(this)
      setTimeout(function () {
        self.removeClass('blur')
      }, GetRandomNum(200, 600))
    } else {

    }
  })
}
window.isMobile = function () {
  if (window.isAndroid()) {
    return true
  } else if (window.isIos()) {
    return true
  }
  return false
}
window.isAndroid = function () {
  if (/(Android)/i.test(navigator.userAgent)) {
    return true
  }
  return false
}
window.isIos = function () {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return true
  }
  return false
}
$(function () {
  $('.leftbarbutton').focus(function () {
    var self = $(this)
    setTimeout(function () {
      self.blur()
    }, 250)
  })
  $('.navbar-toggle').click(function () {
    $('.navbar-collapse').toggleClass('in')
  })
  var vueToggle = function () {
    $('#vue').toggleClass('active')
  }
  $('.leftbarbutton').click(vueToggle)
  $('.fadebg').click(vueToggle)

  activeing()
  $(window).scroll(activeing)
})
function GetRandomNum (Min, Max) {
  var Range = Max - Min
  var Rand = Math.random()
  return (Min + Math.round(Rand * Range))
}
function goLeft (obj, target) {
  clearInterval(obj.timer)
  obj.timer = setInterval(function () {
    var leader = obj.scrollLeft
    var step = (target - leader) / 10
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    leader = leader + step
    $(obj).scrollLeft(leader)
    if (target > 0 && leader >= target) {
      clearInterval(obj.timer)
    }
    if (target <= 0 && leader <= target) {
      clearInterval(obj.timer)
    }
  }, 15)
}
