<template>
  <page class="main" :site="site" :menuLinks="menuLinks">
    <div :class='{"rightHome":site.IsHome,"rightMain":!site.IsHome}'>

      <ly-tab v-if="isMobile" v-model="currenIdIndex">
        <!-- 需通过v-model双向传递索引值, selected是你自己定义的一个在data中用于存放当前tab-item的索引值的变量 -->
        <ly-tab-item v-for="(item, index) in newstype" :key="index">
          {{item.showName}}
        </ly-tab-item>
      </ly-tab>
      <news-type v-else :lists="newstype" :currenId="currenId">
        <template slot-scope="item">
          <span @click="currenId=item.Id">{{item.showName}}</span>
        </template>
      </news-type>
      <div class="container yibanContainer">
        <div class="row">

          <section class="main animation animationT">

            <swiper class="swipertwo" :options="swiperOption">
              <swiper-slide>
                <div class="bgimg" style="background-image:url(http://img.stuln.com/file.2017.stuln.com/FileManageNew/image/jpeg/201712290944162794.jpg?w=800&h=600)"></div>
                <div class="title">
                  <h1>
                    <a href="http://mzml.univs.cn/">党的十九大精神宣传专栏征集暨第二届全国高校“名站名栏…</a>
                  </h1>
                </div>
                <a href="http://mzml.univs.cn/"> </a>
              </swiper-slide>

              <swiper-slide>
                <div class="bgimg" style="background-image:url(http://img.stuln.com/file.2017.stuln.com/FileManageNew/image/png/201712181155499289.png?w=800&h=600)"></div>
                <div class="title">
                  <h1>
                    <a href="http://voice.yiban.cn/index/final">“唱响原创力量 挥洒青春梦想”校园好声音八强总决赛</a>
                  </h1>
                </div>
                <a href="http://voice.yiban.cn/index/final"> </a>
              </swiper-slide>
              <swiper-slide>
                <div class="bgimg" style="background-image:url(http://img.stuln.com/file.2017.stuln.com/FileManageNew/image/jpeg/201712130642261257.jpg?w=800&h=600)"></div>
                <div class="title">
                  <h1>
                    <a href="http://www.stuln.com/xxgg/2017-12-05/Article_15291771.shtml">“发现北方新主播（第二季）” 融媒体主持人大赛</a>
                  </h1>
                </div>
                <a href="http://www.stuln.com/xxgg/2017-12-05/Article_15291771.shtml"> </a>
              </swiper-slide>
              <swiper-slide>
                <div class="bgimg" style="background-image:url(http://img.stuln.com/file.2017.stuln.com/FileManageNew/image/png/201711161121075169.png?w=800&h=600)"></div>
                <div class="title">
                  <h1>
                    <a href="http://jiashu2017.stuln.com/one/">写家书 品家训主题优秀做品选登</a>
                  </h1>
                </div>
                <a href="http://jiashu2017.stuln.com/one/"> </a>
              </swiper-slide>
              <swiper-slide>
                <div class="bgimg" style="background-image:url(http://img.stuln.com/file.2017.stuln.com/FileManageNew/image/png/201711081231277918.png?w=800&h=600)"></div>
                <div class="title">
                  <h1>
                    <a href="http://www.stuln.com/lianmenggg/2017-11-07/Article_15271368.shtml">学习宣传党的十九大精神网络知识竞赛</a>
                  </h1>
                </div>
                <a href="http://www.stuln.com/lianmenggg/2017-11-07/Article_15271368.shtml"> </a>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
              <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            </swiper>
            <div class="mainContent" id="mainContent">
              <div class="news-list" :class="{'loading':articles.length==0&&loading,'isMobile':isMobile}">
                <div v-for="item,index in articles" :key="item.Id" class="item">
                  <h2>
                    <a href="#">
                      <img :src="item.Organization.image" />
                    </a>
                    <a href="#">{{item.Organization.name}}</a>
                    <span>{{item.Organization.describe}}</span>
                    <b class="time">{{ago(Date.parse(item.createDate))}}</b>
                  </h2>
                  <template v-if="item.images.length>1">
                    <div class="info">
                      <h3>
                        <a :href="excuteUrl(item)" target="_blank">{{item.name}}</a>
                      </h3>
                      <div class="row">
                        <div class="col-md-4 col-sm-4" v-for="img,index in item.images" :key="item.id+'-img'+index">
                          <a :href="excuteUrl(item)" target="_blank" class="infoImg"><img :src="bendiImg(img.url)+'?w=150&h=100'" /></a>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="info">
                      <template v-if="(articles.indexOf(item)+1)%7==0||isMobile">
                        <h3>
                          <a :href="excuteUrl(item)" target="_blank">{{item.name}}</a>
                        </h3>
                        <a :href="excuteUrl(item)" target="_blank" v-if="item.images.length==1"><img :src="bendiImg(item.images[0].url)+'?w=750&h=500'" style="max-width:100%;" /></a>
                        <p>
                          <a :href="excuteUrl(item)" target="_blank">{{desc(item.describe,item.content)}}</a>
                        </p>
                      </template>
                      <template v-else>
                        <a :href="excuteUrl(item)" target="_blank" v-if="item.images.length==1" class="infoImg"><img :src="bendiImg(item.images[0].url)+'?w=150&h=100'" /></a>
                        <h3>
                          <a :href="excuteUrl(item)" target="_blank">{{item.name}}</a>
                        </h3>
                        <p>
                          <a :href="excuteUrl(item)" target="_blank">{{desc(item.describe,item.content)}}</a>
                        </p>
                      </template>
                    </div>
                  </template>
                </div>
                <div v-if="articles.length==0&&!loading" class="article">
                  <div class="content" style="margin:0;">
                    <div class="contentInfo" style="margin:0;">
                      <p style="text-align:center;">没有任何信息</p>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div v-loading="loading" style="text-align:center;background-color:transparent;" class="loadingbutton">
                    <a href="javascript:void(0)" class="btn btn-default" color="red" label @@click="request()" v-if="!isEnd">加载更多</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="right">
            <div class="rightContent">
              <section class="center">
                <div class="centerMain">
                  <div class="panel panel-stuln animation animationT delay50">
                    <div class="panel-title" v-if="yigonggao.thisclass==null">
                      <h3>
                        <a href="#">易公告</a>
                      </h3>
                      <span>
                        <b></b>
                        <b></b>
                      </span>
                      <a href="" class="more">MORE
                        <i>+</i>
                      </a>
                    </div>
                    <div class="panel-title" v-else>
                      <h3>
                        <a :href="'/infolist/'+yigonggao.thisclass.Id" target="_blank">{{yigonggao.thisclass.showName}}</a>
                      </h3>
                      <span>
                        <b></b>
                        <b></b>
                      </span>
                      <a :href="'/infolist/'+yigonggao.thisclass.Id" target="_blank" class="more">MORE
                        <i>+</i>
                      </a>
                    </div>
                    <div class="panel-body" v-loading="yigonggao.loading">
                      <ul>
                        <li v-for="item,index in yigonggao.articles" :key="'yigonggao'+item.Id">
                          <span>{{(item.createDate+'').substring(5,10)}}</span>
                          <a :title="item.name" :href="excuteUrl(item)" target="_blank">{{item.name}}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="stickyhidden panel panel-zi animation animationT delay100">
                    <div class="panel-title">
                      <h3>
                        <a href="#">机构排行</a>
                      </h3>
                      <span>
                        <b></b>
                        <b></b>
                      </span>                      
                    </div>
                    <div class="panel-body">
                      <div class="imglist">
                        <div v-for="item,index in service.lists.slice(0,10)" :key="'service'+index">
                          <a :href="item.url" target="_blank">
                            <img :src="item.img">
                            <h3>{{item.name}}</h3>
                            <span>No. {{index+1}}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section class="center">
                <div class="centerMain">
                  <div class="panel panel-huang animation animationT delay125">
                    <div class="panel-title">
                      <h3>
                        <a href="#">活动</a>
                      </h3>
                      <span>
                        <b></b>
                        <b></b>
                      </span>
                    </div>
                    <div class="panel-body" v-loading="hot.loading">
                      <ul>
                        <li v-for="item,index in hot.articles" :key="'hot'+item.Id">
                          <span>{{(item.createDate+'').substring(5,10)}}</span>
                          <a :title="item.name" :href="excuteUrl(item)" target="_blank">{{item.name}}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="stickyhidden panel panel-hong animation animationT delay175">
                    <div class="panel-title" v-if="yiboyuan.thisclass==null">
                      <h3>
                        <a href="#">易博园</a>
                      </h3>
                      <span>
                        <b></b>
                        <b></b>
                      </span>
                      <a href="" class="more">MORE
                        <i>+</i>
                      </a>
                    </div>
                    <div class="panel-title" v-else>
                      <h3>
                        <a :href="'infolist/'+yiboyuan.thisclass.Id" target="_blank">{{yiboyuan.thisclass.showName}}</a>
                      </h3>
                      <span>
                        <b></b>
                        <b></b>
                      </span>
                      <a :href="'infolist/'+yiboyuan.thisclass.Id" target="_blank" class="more">MORE
                        <i>+</i>
                      </a>
                    </div>
                    <div class="panel-body" v-loading="yiboyuan.loading">
                      <ul>
                        <li v-for="item,index in yiboyuan.articles" :key="'yiboyuan'+item.Id">
                          <span>{{(item.createDate+'').substring(5,10)}}</span>
                          <a :title="item.name" :href="excuteUrl(item)" target="_blank">{{item.name}}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
      <div class="container yibanContainer-fluid">
        <div class="footer">
          Copyright © 2016-@(DateTime.Now.Year)
          <br /> Copyright &copy; stuln.com 2008-@DateTime.Now.Year 网站建设：
          <a href="http://www.hengken.com.cn" target="_blank">恒肯科技</a>
        </div>
      </div>
    </div>
    <div class="fadebg"></div>
  </page>
</template>
<script>
import page from '../components/page.vue'
import NewsType from '../components/NewsType.vue'
import LyTab from '../components/tab/src/tab'
import LyTabItem from '../components/tab/src/tab-item'

export default {
  name: 'App',
  components: { page, NewsType, LyTab, LyTabItem },

  data () {
    return {
      isMobile: false,
      site: _site,
      menuLinks: _menuLinks,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      currenId: _newstype[0].Id,
      currenIdIndex: 0,
      newstype: _newstype,
      articles: [],
      page: 0,
      pagesize: 20,
      lastId: 0,
      maxId: 0,
      isEnd: false,
      loading: false,
      source: null,
      yigonggao: {
        url: '/yiban/MinIndex?classid=114&pagesize=10',
        loading: false,
        thisclass: null,
        articles: []
      },
      yiboyuan: {
        url: '/yiban/MinIndex?classid=115&pagesize=10',
        loading: false,
        thisclass: null,
        articles: []
      },
      hot: {
        url: '/yiban/MinIndex?type=Hot&pagesize=10',
        loading: false,
        articles: []
      },
      service: {
        lists: _lists
      }
    }
  },

  methods: {
    ago: time => {
      return Time.ago(time)
    },
    excuteUrl: function (item) {
      return item.isOutLink
        ? item.outLink == null ? item.fromUrl : item.outLink
        : '/yiban/info/' + item.Id
    },
    desc: function (desc, content) {
      if (desc.length > 3) {
        return desc
      }
      return (
        content
          .replace(/<.[^>]*>/gi, '')
          .replace(/&.*;/gi, '')
          .replace(/\s+/gi, '')
          .substring(0, 80) + '…'
      )
    },
    bendiImg: function (imgurl) {
      var self = this
      if (imgurl == null || imgurl === undefined || imgurl.length <= 0) {
        return imgurl
      }
      if (imgurl.startWith('http://')) {
        return imgurl.replace('http://', self.site.RemoteCutImgUrl)
      }
      return imgurl
    },
    request: function () {
      var self = this
      if (self.isEnd) {
        return
      }
      if (self.source != null) {
        self.source.cancel('取消了')
      }
      self.source = axios.CancelToken.source()
      self.loading = true
      axios
        .post('/yiban/MinIndex', {
          classid: self.currenId,
          page: self.page,
          pagesize: self.pagesize,
          maxId: self.maxId,
          lastId: self.lastId
        })
        .then(function (res) {
          var data = res.data
          if (data.Articles.length == 0) {
            self.isEnd = true
            self.loading = false
          } else {
            data.Articles.map(function (item) {
              item.deleteing = false
              item.deleted = false
              // if(item.Id>self.maxId){
              //    self.maxId = item.Id;
              // }
              if (self.lastId == 0 || item.Id < self.lastId) {
                self.lastId = item.Id
              }
              self.articles.push(item)
            })
            self.loading = false
          }
          self.source = null
        })
        .catch(function (error) {
          console.log(error)
          self.loading = false
        })
    },
    requestPanel: function () {
      var self = this
      // self.yigonggao
      self.yigonggao.loading = true
      axios
        .post(self.yigonggao.url, {})
        .then(function (res) {
          var data = res.data
          self.yigonggao.loading = false
          self.yigonggao.thisclass = data.thisclass
          self.yigonggao.articles = data.Articles
        })
        .catch(function (error) {
          console.log(error)
          self.yigonggao.loading = false
        })
      // self.yiboyuan
      self.yiboyuan.loading = true
      axios
        .post(self.yiboyuan.url, {})
        .then(function (res) {
          var data = res.data
          self.yiboyuan.loading = false
          self.yiboyuan.thisclass = data.thisclass
          self.yiboyuan.articles = data.Articles
        })
        .catch(function (error) {
          console.log(error)
          self.yiboyuan.loading = false
        })
      // self.hot
      self.hot.loading = true
      axios
        .post(self.hot.url, { pagesize: 6 })
        .then(function (res) {
          var data = res.data
          self.hot.loading = false
          self.hot.articles = data.Articles
        })
        .catch(function (error) {
          console.log(error)
          self.hot.loading = false
        })
    },
    scrollHandle: _.debounce(function () {
      let self = this
      if (
        $('.loadingbutton').length > 0 && !self.loading && $('.loadingbutton').offset().top - $(window).scrollTop() <
          $(window).height() + 200
      ) {
        self.request()
      }
      if($(window).scrollTop()>300){
        $(".stickyhidden").hide(100)
      }
      else{
        $(".stickyhidden").show(100)
      }
    }, 200)
  },
  watch: {
    currenId: function (value, oldvalue) {
      let self = this
      self.articles = []
      self.page = 0
      self.maxId = 0
      self.lastId = 0
      self.isEnd = false
      self.request()
      let _c = 0
      self.newstype.map((item) => {
        if (item.Id == value) {
          _c = self.newstype.indexOf(item)
        }
      })
      self.currenIdIndex = _c
    },
    currenIdIndex: function (value, oldvalue) {
      let self = this
      self.currenId = self.newstype[value].Id
    }
  },
  mounted () {
    var self = this
    self.isMobile = window.isMobile()
    self.requestPanel()
    self.request()
    window.addEventListener('scroll', this.scrollHandle)
    if (!self.isMobile) {
        var sticky = new Sticky(".rightContent", { marginTop: 70 });
    }
  },
  destroyed () {
    window.addEventListener('scroll', this.scrollHandle)
  }
}
</script>
