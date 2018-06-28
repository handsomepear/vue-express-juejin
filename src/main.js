import Vue from 'vue'
import App from './App.vue'
import stores from './store'
import VueRouter from 'vue-router'
import routes from './router.config'
import axios from 'axios'
import verify from 'vue-verify-plugin'  // 表单验证插件
import { InfiniteScroll } from 'mint-ui' // 无限加载
import * as filters from './filters/custom' // 过滤器
Vue.use(InfiniteScroll)
Vue.use(VueRouter)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 自定义手机号和邮箱组合验证
const myRules = {
  phoneEmail: {
    test: /(^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$)|(^1[3|4|5|8|7]\d{9}$)/,
    message: '邮箱或手机格式错误'
  },
  pwd: {
    test(val) {
      if (val.length < 6) {
        return false
      }
      return true
    },
    message: '密码长度不能小于6位'
  },
  usernameRequired: {
    test(val) {
      if (val.trim() == '') {
        return false
      }
      return true
    },
    message: '用户名不能为空'
  },
  phoneEmailRequired: {
    test(val) {
      if (val.trim() == '') {
        return false
      }
      return true
    },
    message: '电话或邮箱不能为空'
  },
  pwdRequired: {
    test(val) {
      if (val.trim() == '') {
        return false
      }
      return true
    },
    message: '密码不能为空'
  }
}
Vue.use(verify, {
  blur: false,
  rules: myRules
})
const router = new VueRouter({
  base: __dirname,
  scrollBehavior: () => ({ y: 0 }), // 路由切换滚动条置顶
  routes
})

Vue.prototype.$http = axios // 把axios挂载到Vue对象上 用的时候直接 this.$http 就可以了
new Vue({
  el: '#app',
  store: stores,
  router,
  render: h => h(App)
})
