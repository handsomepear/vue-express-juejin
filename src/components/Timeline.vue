<template>
  <main class="container main-container with-view-nav" id="timeline">
    <div class="view ">
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
              <li class="nav-item ">
                <a href="javascript:;">评论</a>
              </li>
            </ul>
          </nav>
        </header>
        <myArticle></myArticle>
      </div>

    </div>
  </main>
</template>
<script>
import viewNav from './ViewNav.vue'
import myArticle from './Artical.vue'
export default {
  components: {
    viewNav,
    myArticle
  }
}
</script>

<style scoped>
@import url('../static/css/collect.css');
</style>
