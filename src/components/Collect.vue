<template>
  <main class="container main-container with-view-nav" id="collect">
    <div class="view collection-index-view">
      <viewNav></viewNav>
      <div class="collection-list-box shadow">
        <header class="list-header">
          <nav class="list-nav">
            <ul class="nav-list left">
              <li class="nav-item active">
                <a href="javascript:;">热门</a>
              </li>
              <li class="nav-item ">
                <a href="javascript:;">最新</a>
              </li>
            </ul>
          </nav>
        </header>
        <ul class="collection-list collection-list">
          <li class="item" v-for="collection in collectionsList">
            <div class="one-collection">
              <a href="javascript:;">
                <div class="lazy thumb thumb loaded" :style="{backgroundImage:'url('+collection.bgImg+')',backgroundSize:'cover'}"></div>
                <div class="mask"></div>
                <div class="content">
                  <div class="title">{{collection.title}}</div>
                  <ul class="meta-list">
                    <li class="meta username">{{collection.name}}</li>
                    <li class="meta entry">{{collection.entry}}篇文章</li>
                    <li class="meta entry">{{collection.follow}}人关注</li>
                  </ul>
                  <button class="follow-btn" :class="{followed: collection.followed}" @click.prevent="changeFollow($event,collection)">
                    <span v-if="!collection.followed">关注</span>
                    <span v-if="collection.followed">已关注</span>
                  </button>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </main>
</template>
<script>
import viewNav from "./ViewNav.vue";
import { mapActions } from "vuex";
export default {
  components: {
    viewNav
  },
  data() {
    return {
      collectionsList: []
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    ...mapActions(["LOGIN_SHOW"]),
    fetchData() {
      this.$http.get("/collections").then(({ data }) => {
        this.collectionsList.splice(0,this.collectionsList.length)
        this.collectionsList = this.collectionsList.concat(data.data);
      });
    },
    changeFollow(e, card) {
      // 关注实现
      var isLogin = localStorage.getItem("isLogin");
      if (!isLogin) {
        this.$store.dispatch("LOGIN_SHOW");
      } else {
        if (!card.followed) {
          this.follow(card);
        } else {
          this.unfollow(card);
        }
      }
    },
    follow(card) {
      // 关注
      var userId = JSON.parse(localStorage.getItem("user")).id;
      var params = new URLSearchParams();
      params.append("cardId", card.col_id);
      params.append("userId", userId);
      this.$http.post("/follow", params).then(({ data }) => {
        if (data.code == 1000) {
          var currentCard = this.collectionsList.find(
            ele => ele.col_id == card.col_id
          );
          console.log(currentCard);
          currentCard.followed = !currentCard.followed;
          currentCard.follow++;
        }
      });
    },
    unfollow(card) {
      // 取消关注
      console.log(card);
      var userId = JSON.parse(localStorage.getItem("user")).id;
      var params = new URLSearchParams();
      params.append("cardId", card.col_id);
      params.append("userId", userId);
      this.$http.post("/unfollow", params).then(({ data }) => {
        if (data.code == 1000) {
          var currentCard = this.collectionsList.find(
            ele => ele.col_id == card.col_id
          );
          currentCard.followed = !currentCard.followed;
          currentCard.follow--;
        }
      });
    }
  }
};
</script>

<style scoped>
@import "../static/css/collect.css";
</style>