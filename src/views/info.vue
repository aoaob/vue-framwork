<template>
  <page class="main" :site="site" :menuLinks="menuLinks">
    <div :class='{"rightHome":site.IsHome,"rightMain":!site.IsHome}'>
      <a name="mao0" id="mao0" class="mao"></a>
      <div class="articleHeader contentPanel">
        <div class="yibanContainer">
          <div class="row">
            <div class="col-md-9">
              <ol class="breadcrumb">
                <li>
                  <a href="/">首页</a>
                </li>

                <li class="menu_61476">
                  <a :href="'/yiban/list/'+Article.classId">{{Article.systemClass.showName}}</a>
                </li>
              </ol>
              <div>
                <h1>{{Article.name}}</h1>
              </div>
            </div>

            <div class="col col-md-3" v-if="Article.Organization&&Article.Organization.image">

              <div class="Organization">
                <div class="title">
                  <div class="img">
                    <img :src="Article.Organization.image+'?w=64&h=64'" />
                  </div>
                  <div class="name">
                    <h3>{{Article.Organization.name}}</h3>
                    <span>{{Article.Organization.describe}}</span>
                  </div>

                </div>
                <div class="numberinfo">
                  <ul>
                    <li>
                      <div>
                        微信
                        <span>127</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        微博
                        <span>89</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        易班
                        <span>45</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        赞
                        <span>89</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <span class="about">

              {{Article.createDate}}

              <i v-if="Article.fromUrl!=''">
                <br />
                <text>原文链接：</text>
                <a :href="Article.fromUrl">{{Article.fromUrl.split('/')[2]}}
                  <i class="fa fa-external-link"></i>
                </a>
              </i>
            </span>

          </div>

        </div>
      </div>
      <div class="articleContent">
        <div class="yibanContainer">
          <div class="row">

            <div class="col-md-9">
              <div>
                <div class="panel panel-huang contentPanel">
                  <div class="panel-body">
                    <div class="content" :class="{isMobile:isMobile}" id="TextContent">

                      <div style="text-align:center;" v-if="Article.images.length>0">
                        <img :src="Article.images[0].url" />
                      </div>
                      <div v-html="Article.content" class="typo typo-selection">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <!--
              <div class="panel panel-bai active contentPanel">
                <div class="panel-body" style="">
                  <ul></ul>
                </div>
              </div>
              <div class="panel panel-bai active contentPanel">
                <div class="panel-title2">
                  <h3>
                    <a href="#">热门话题</a>
                  </h3>
                </div>
                <div class="panel-body" style="">
                  <ul></ul>
                </div>
              </div>-->
              <div class="selector">
                目录
                <dl>
                  <dt @click="goto(0)" :class="{active:mao==0}">{{Article.name}}</dt>
                  <dd v-for="item,index in mulu" :key="index" @click="goto(item.index)" :class="{active:mao==item.index,leval1:item.leval==1,leval2:item.leval==2,leval3:item.leval==3}">
                    <span>{{item.text}}</span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <share class="share" :config="{sites:['qzone', 'qq', 'weibo', 'douban','wechat']}"></share>
    </div>
  </page>
</template>
<script>
import page from "../components/page.vue";
import Share from "vue-social-share";
export default {
  name: "info",
  components: { page, Share },
  data() {
    return {
      isMobile: false,
      site: _site,
      menuLinks: _menuLinks,
      Article: _article,
      mao: 0,
      mulu: []
    };
  },
  mounted() {
    var self = this;
    self.isMobile = window.isMobile();
    self.excuteText();
    window.addEventListener("scroll", this.scrollHandle);
  },
  destroyed() {
    window.addEventListener("scroll", this.scrollHandle);
  },
  methods: {
    scrollHandle() {},
    goto: function(id) {
      console.log(id);
      var self = this;
      $("html,body").animate({ scrollTop: $("#mao" + id).offset().top }, 1000);
      self.mao = id;
      setTimeout(function() {
        window.location.hash = "mao" + id;
      }, 600);
    },
    excuteText() {
      var self = this;
      var TextContent = $("#TextContent");
      if (TextContent) {
        TextContent.find("span").removeAttr("style"); // .css({'font-size':'initial','font-family':'initial'});
        TextContent.find("img").each(function(index, element) {
          var $this = $(this);
          $this.css({
            margin: "0px auto",
            display: "block",
            "max-width": "100%",
            width: "auto",
            height: "auto",
            float: "none",
            opacity: 1
          });
          if ($this.attr("data-w")) {
            $this.css({
              width: $this.attr("data-w") + "px"
            });
          }
          if (
            new RegExp(/^http:\/\/mmbiz\.qpic\.cn/g).test($this.attr("src"))
          ) {
            $this.attr(
              "src",
              $this
                .attr("src")
                .replace(
                  /^http:\/\/(.[^\?]*)\??.*$/g,
                  "http://img.stuln.com/$1"
                )
            );
          }
        });
        TextContent.find("iframe").each(function(index, element) {
          var $this = $(this);
          $this.css({
            margin: "12px auto",
            "max-width": "100%",
            width: "500px",
            height: "375px",
            display: "block"
          });
          if ($this.attr("data-src")) {
            $this.attr("src", $this.attr("data-src"));
          }
        });
        TextContent.find("svg").each(function(index, element) {
          var $this = $(this);
          $this.remove();
        });
        TextContent.find("section,p").each(function(index, element) {
          var $this = $(this);
          var css = {};
          if ($this.css("text-align") == "center") {
            $this.removeAttr("style");
            $this.css({
              "text-align": "center",
              "text-indent": 0,
              margin: "0 0 0 0"
            });
          } else {
            $this.removeAttr("style");
          }

          // if ($this.text().replace(/\s+/ig, "") == "") {
          //    $this.remove();
          //    return;
          // }
          if ($this.attr("class")) {
            $this.removeAttr("class");
          }

          if ($this.attr("powered-by")) {
            $this.removeAttr("powered-by");
          }

          // if (new RegExp(/(&nbsp;\s*){5,100}/g).test($this.html())) {
          //    $this.css({ 'text-align': 'right' });
          // }
          if ($this.attr("align") == "center") {
            $this.css({ "text-indent": "0" });
          }
        });
        TextContent.find("section,p").each(function(index, element) {
          var $this = $(this);
          $this.html($this.html().replace(/(&nbsp;\s*){1,100}/g, ""));
          if (
            $this.find("img").length < 1 &&
            RegExp(/\s*/g).test($this.text())
          ) {
            $this.remove();
          }
        });
        TextContent.find("a").each(function(index, element) {
          var $this = $(this);

          if (new RegExp(/\.(docx|doc)$/g).test($this.attr("href"))) {
            $this.addClass("down doc");
          } else if (new RegExp(/\.(xlsx|xls)$/g).test($this.attr("href"))) {
            $this.addClass("down xls");
          } else if (new RegExp(/\.(pptx|ppt)$/g).test($this.attr("href"))) {
            $this.addClass("down ppt");
          } else if (new RegExp(/\.(rar)$/g).test($this.attr("href"))) {
            $this.addClass("down rar");
          } else if (new RegExp(/\.(zip)$/g).test($this.attr("href"))) {
            $this.addClass("down zip");
          }
          $this.removeAttr("style");

          if ($this.find("img").length == 0) {
            $this.html($this.text());
          }
        });

        TextContent.find("strong").each(function(index, element) {
          var $this = $(this);
          var _text = $this.text();
          var _parentText = $this.parent().text();
          if (_text.length > 0 &&(_text == _parentText || _parentText.indexOf(_text) == 0)) {
            var leval = 2;
            if (/^[一二三四五六七八九十]+.*/.test(_text)) {
              leval = 1;
            } else {
              console.log(
                `${_text} /^[一二三四五六七八九十]+.*/->${/^[一二三四五六七八九十]+.*/.test(
                  _text
                )}`
              );
            }
            if (/^[0-9]{1,2}\..*/.test(_text)) {
              leval = 3;
            } else {
              console.log(
                `${_text} /^[0-9]{1,2}\..*/->${/^[0-9]{1,2}\..*/.test(_text)}`
              );
            }
            self.mulu.push({ index: index + 1, text: _text, leval: leval });
            $this
              .parent()
              .css({ position: "relative" })
              .prepend(
                `<a name="mao${index + 1}" id="mao${index + 1}" class="mao"><a>`
              );
          }
        });
      }
      if (!self.isMobile) {
        var sticky = new Sticky(".selector", { marginTop: 70 });
      }
    }
  }
};
</script>
