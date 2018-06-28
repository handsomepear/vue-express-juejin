/* import Home from './components/Home.vue'
import Column from './components/Column.vue'
import Collect from './components/Collect.vue' */
// 路由懒加载
const Home = resolve => { require(['./components/Home.vue'], resolve) }
const Column = resolve => { require(['./components/Column.vue'], resolve) }
const Collect = resolve => { require(['./components/Collect.vue'], resolve) }
const Timeline = resolve => { require(['./components/Timeline.vue'], resolve) }
const MyCollections = resolve => { require(['./components/MyCollections.vue'], resolve) }
export default [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/column', component: Column },
  { path: '/collect', component: Collect },
  { path: '/timeline', component: Timeline },
  { path: '/myCollections', component: MyCollections }
]