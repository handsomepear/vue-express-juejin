<template>
  <ul class="column-entry-list" >
    <li class="item" v-for="article in articleList">
      <div class="column-entry">
        <div class="row user-info-row">
          <div class="user-popover-box">
            <a href="javascript:;" class="user-info">
              <div class="lazy avatar avatar loaded" style="background-image: url('/static/images/1fcfc04da8adab17749d8acb1c280339');"></div>
              <span class="username">{{article.author}}</span>
            </a>
          </div>
          <span class="date">{{article.time | timeFromNow}}</span>
        </div>
        <div class="row thumb-row" v-if="article.imgUrl">
          <div class="user-popover-box">
            <a href="javascript:;" class="user-info">
              <div class="lazy thumb thumb loaded" :style="{backgroundImage: 'url('+article.imgUrl+')',backgroundSize: 'cover'}"></div>
              <span class="username">{{article.author}}</span>
            </a>
          </div>
          <span class="date">{{article.time | timeFromNow}}</span>
        </div>
        <div class="row  abstract-row">
          <a href="javascript:;" class="title">{{article.title}}</a>
          <a href="javascript:;" :class="[{read: isRead,withThumb:article.imgUrl}, abstract]">{{article.content}}</a>
        </div>
        <div class="row  action-row">
          <ul class="action-list">
            <li class="action like clickable">
              <div class="icon icon-likes iconfont icon-xlcollection">
                <span class="count">{{article.likes}}</span>
              </div>
            </li>
            <li class="action comment clickable">
              <div class="icon icon-comments iconfont icon-xlchatbox">
                <span class="count">{{article.comment}}</span>
              </div>
            </li>

          </ul>
          <div class="entry-action-box">
            <a href="javascript:;" class="read-action" @click="toggleRead">{{readInfo}}</a>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      abstract: 'abstract',
      isRead: false,
      readInfo: '阅读全文',
      articleList: []
    }
  },
  created(){
    this.more()
  },
  methods: {
    toggleRead() {
      this.isRead ? this.readInfo = '阅读全文' : this.readInfo = '收起'
      this.isRead = !this.isRead
    },
    more() {
      // this.loading = true
      // console.log("执行了");
      this.$http.get('/columnAll').then(({ data }) => {
        // console.log(data);
        if(data.list.length){
          this.articleList = this.articleList.concat(data.list)
          // this.loading = false
        }
      });
    }
  }
}
</script>
