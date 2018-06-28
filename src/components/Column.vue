<template>
  <!-- start: main -->
  <main class="container main-container with-view-nav" id="column">
    <div class="view column-index-view">
      <viewNav></viewNav>
      <div class="column-entry-list shadow">
        <header class="list-header">
          <span class="list-title">原创文章</span>
          <nav class="list-nav">
            <ul class="nav-list">
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
        <columnArtical></columnArtical>
      </div>
    </div>
  </main>
  <!-- end: main -->
</template>
<script>
import viewNav from './ViewNav.vue';
import columnArtical from './Column-Artical.vue';
export default {
  components: {
    viewNav,
    columnArtical
  }
}
</script>
<style scoped>
@import url('../static/css/list-header.css');
@import url('../static/css/nav.css');
@import url('../static/css/column.css');
</style>
