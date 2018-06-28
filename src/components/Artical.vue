<template>
  <ul class="entry-list">
    <li class="item" v-for="article in articleList">
      <div class="content-box">
        <div class="info-box">
          <div class="info-row meta-row">
            <ul class="meta-list">
              <li class="item recommended">荐</li>
              <li class="item post">{{article.type}}</li>
              <li class="item username clickable">{{article.author}}</li>
              <li class="item">{{article.time | timeFromNow}}</li>
              <li class="item tag">{{article.tag}}</li>
            </ul>
          </div>
          <div class="info-row title-row">
            <a href="javascript:;" class="title">{{article.title}}</a>
          </div>
          <div class="info-row abstract-row" >{{article.content}}</div>
          <div class="info-row action-row">
            <ul class="action-list">
              <li class="item like clickable">
                <a href="javascript:;" class="title-box">
                  <img src="../static/images/like.4bf00fb.svg" alt="" class="icon">
                  <span class="count">{{article.likes}}</span>
                </a>
              </li>
              <li class="item comment clickable">
                <a href="javascript:;" class="title-box">
                  <img src="../static/images/comment.4d5744f.svg" alt="" class="icon">
                  <span class="count">{{article.comments}}</span>
                </a>
              </li>
            </ul>
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
      // 标记是否显示文章内容
      abstractShow: false,
      articleList: [],
      isShow: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$http.get("/firstPage").then(({ data }) => {
        if (data.list.length) {
          this.articleList = this.articleList.concat(data.list);
        }
      });
    }
  }
};
</script>
<style scoped>
@import url("../static/css/article.css");
</style>