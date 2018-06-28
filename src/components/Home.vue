<template>
  <!-- start: main -->
  <main class="container main-container" id="home">
    <div class="welcome__section">
      <div class="feed welcome__feed">
        <nav class="category-nav">
          <h5>热门文章</h5>
          <div class="more">查看更多</div>
        </nav>
        <!-- start: 文章列表 -->
        <myArticle></myArticle>
        <!-- end: 文章列表 -->
      </div>
    </div>
  </main>
  <!-- end: main -->
</template>
<script>
import myArticle from './Artical.vue'
import viewNav from './ViewNav.vue'
export default {
  components: {
    myArticle,
    viewNav
  }
}
</script>

<style scoped>
@import '../static/css/app.css';
</style>

