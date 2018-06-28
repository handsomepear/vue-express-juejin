<template>
  <main class="container main-container tight">
    <div data-v-4cdfa676="" data-v-3f216172="" class="view user-view">
      <div data-v-4cdfa676="" data-v-3f216172="" class="user-info-box">
        <div data-v-b2db8566="" data-v-1b9df826="" data-v-4cdfa676=""  class="lazy avatar avatar loaded" data-v-3f216172="" :style="{backgroundImage: 'url('+user.avatar+')'}"></div>
        <div data-v-4cdfa676="" data-v-3f216172="" class="username">{{user.username}}</div>
        <button data-v-4cdfa676="" data-v-3f216172="" class="setting-btn">设置</button>
      </div>
    </div>
    <div data-v-4dc85087="" data-v-4cdfa676="" class="user-profile-list user-profile-list shadow collection" data-v-3f216172="">
      <div data-v-4edf698c="" data-v-4dc85087="" class="list-box">
        <header data-v-4edf698c="" class="list-header">
          <div data-v-0ca11c9a="" data-v-4edf698c="" class="type-selector type-selector">
            <div data-v-0ca11c9a="" class="current">
              <div data-v-0ca11c9a="" class="title">收藏集 1 个</div>
              <div data-v-0ca11c9a="" class="icon ion-arrow-down-b"></div>
            </div>
          </div>
          <ul data-v-4edf698c="" class="sort-list">
            <li data-v-4edf698c="" class="item">创建的 (0)</li>
            <li data-v-4edf698c="" class="item active">关注的 ({{cardList.length}})</li>
          </ul>
        </header>
        <ul data-v-5892eb8d="" data-v-4edf698c="" st:block="collectionList" class="collection-list list collection-list">
          <!---->
          <!---->
          <li data-v-5892eb8d="" class="item" v-for="card in cardList">
            <div data-v-12d785cd="" data-v-5892eb8d="" class="one-collection">
              <a data-v-12d785cd="" href="/collection/58d9c70b1e35c9353d934e93" target="_blank">
                <div data-v-b2db8566="" data-v-009ea7bb="" data-v-12d785cd=""  class="lazy thumb thumb loaded" :style="{backgroundImage: 'url('+card.bgImg+')',backgroundSize: 'cover'}"></div>
                <div data-v-12d785cd="" class="mask"></div>
                <div data-v-12d785cd="" class="content">
                  <div data-v-12d785cd="" class="title">{{card.title}}</div>
                  <ul data-v-12d785cd="" class="meta-list">
                    <li data-v-12d785cd="" class="meta username">{{card.name}}</li>
                    <li data-v-12d785cd="" class="meta entry">{{card.entry}}篇文章</li>
                    <li data-v-12d785cd="" class="meta follower">{{card.follow}} 人关注</li>
                  </ul>
                  <button data-v-12d785cd class="follow-btn followed">
                    <span data-v-12d785cd>已关注</span>
                  </button>
                </div>
              </a>
            </div>
          </li>
          <!---->
        </ul>
      </div>
    </div>
  </main>
</template>
<script>
  export default {
    data(){
      return {
        cardList: [],
        user: {}
      }
    },
    created(){
      this.fetchData()
    },
    watch: {
      "$route": "fetchData"
    },
    methods: {
      fetchData(){
        var userId = JSON.parse(localStorage.getItem('user')).id
        this.$http.get('/myCollections',{
          params: {
            userId: userId
          }
        }).then(({data}) => {
          this.cardList.splice(0, this.cardList.length)
          this.cardList = this.cardList.concat(data.data)
        })
        this.$http.get('/userInfo', {
          params: {
            userId: userId
          }
        }).then(({data}) => {
          if(data.code == 1000){
            Object.assign(this.user, data.data)
            console.log(this.user);
          }
        })
      }
    }
  }
</script>
<style scoped>
@import '../static/css/myCollections.css';
</style>