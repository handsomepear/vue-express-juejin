<template>
  <div class="main-header-box">
    <header class="main-header  visible">
      <div class="container">
        <a href="javascript:;" class="logo">
          <img src="../static/images/logo.a7995ad.svg" alt="" class="logo-img">
        </a>
        <nav class="main-nav">
          <ul class="nav-list">
            <div class="main-nav-list">
              <div class="phone-show-menu" @click.stop="showMenu">
                <span v-text="menuList[selected].text"> </span>
                <div class="icon ion-arrow-down-b"></div>
              </div>
              <div class="phone-hide" :class="{show:headMenushow}">
                <li class="nav-item link-item" v-for="(menu, menuIndex) in menuList" :class="{active:selected==menuIndex}" @click="select(menuIndex)">
                  <router-link :to="menu.href">{{menu.text}}</router-link>
                </li>
              </div>
            </div>
            <li class="nav-item auth" v-if="!isLogin">
              <span class="login" @click="LOGIN_SHOW">登陆</span>
              <span class="register" @click="REG_SHOW">注册</span>
            </li>
            <li class="nav-item notification" v-if="isLogin">
              <i class="icon ion-android-notifications"></i>
            </li>
            <li class="nav-item menu" v-if="isLogin">
              <div @click.stop="showUserMenu" data-v-b2db8566="" data-src="https://dn-mhke0kuv.qbox.me/7pZmyvCqKQGQaDqtMZrAQIB?imageView2/1/w/100/h/100/q/85/interlace/1" class="lazy avatar avatar loaded" style="background-image: url(/static/images/avatar.jpg);"></div>
              <ul data-v-5ce25e66="" class="nav-menu user-dropdown-list" v-show="showUserList">
                <div data-v-5ce25e66="" class="nav-menu-item-group">
                  <li data-v-5ce25e66="" class="nav-menu-item">
                    <a data-v-5ce25e66="">
                      <i data-v-5ce25e66="" class="fengwei fw-write"></i>写文章</a>
                  </li>
                  <li data-v-5ce25e66="" class="nav-menu-item">
                    <a data-v-5ce25e66="">
                      <i data-v-5ce25e66="" class="fengwei fw-draft"></i>草稿</a>
                  </li>
                </div>
                <div data-v-5ce25e66="" class="nav-menu-item-group">
                  <li data-v-5ce25e66="" class="nav-menu-item route-active">
                    <a data-v-5ce25e66="" href="javascript:;">
                      <i data-v-5ce25e66="" class="fengwei fw-person"></i>我的主页</a>
                  </li>
                  <li data-v-5ce25e66="" class="nav-menu-item">
                    <a data-v-5ce25e66="" href="javascript:;">
                      <i data-v-5ce25e66="" class="fengwei fw-like"></i>我喜欢的</a>
                  </li>
                  <li data-v-5ce25e66="" class="nav-menu-item router-link-exact-active route-active">
                    <router-link data-v-5ce25e66="" to="/myCollections">
                      <i data-v-5ce25e66="" class="fengwei fw-collection"></i>我的收藏集</router-link>
                  </li>
                  <li data-v-5ce25e66="" class="nav-menu-item">
                    <a data-v-5ce25e66="" href="javascript:;">
                      <i data-v-5ce25e66="" class="fengwei fw-tag"></i>标签管理</a>
                  </li>
                </div>
                <div data-v-5ce25e66="" class="nav-menu-item-group">
                  <li data-v-5ce25e66="" class="nav-menu-item">
                    <a data-v-5ce25e66="" href="javascript:;">
                      <i data-v-5ce25e66="" class="fengwei fw-setting"></i>设置</a>
                  </li>
                  <li data-v-5ce25e66="" class="nav-menu-item more">
                    <a data-v-5ce25e66="">
                      <i data-v-5ce25e66="" class="fengwei fw-info"></i>关于
                      <i data-v-5ce25e66="" class="ion-chevron-right more-icon"></i>
                    </a>
                  </li>
                </div>
                <div data-v-5ce25e66="" class="nav-menu-item-group">
                  <li data-v-5ce25e66="" class="nav-menu-item">
                    <a data-v-5ce25e66="" @click="layout">
                      <i data-v-5ce25e66="" class="fengwei fw-logout"></i>登出</a>
                  </li>
                </div>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headMenushow: false,
      menuList: [
        { text: "首页", href: "/home" },
        { text: "专栏", href: "/column" },
        { text: "收藏集", href: "/collect" },
        { text: "发现", href: "/" },
        { text: "开源库", href: "/" }
      ],
      showUserList: false, // 点击用户头像显示用户下拉列表,
    };
  },
  created(){
    this.updateMenuList()
  },
  mounted() {
    // 点击文档隐藏下拉列表
    document.onclick = function() {
      this.headMenushow = false;
      this.showUserList = false;
    }.bind(this);
    // 将当前选中的索引存入到storage中
    var selected = sessionStorage.getItem("selected");
    if (selected) {
      this.$store.commit("CHANGE_SELECTED", selected);
    }
  },
  methods: {
    ...mapActions([
      "LOGIN_SHOW",
      "LOGIN_HIDDEN",
      "REG_SHOW",
      "REG_HIDDEN",
      "CHANGETO_LOGIN",
      "CHANGETO_LOGOUT",
      "CHANGE_SELECTED"
    ]),
    showMenu() {
      this.headMenushow = !this.headMenushow;
    },
    select(index) {
      this.$store.commit("CHANGE_SELECTED", index);
      // 保存当前切换的标签
      sessionStorage.setItem("selected", this.selected);
    },
    showUserMenu() {
      this.showUserList = !this.showUserList;
    },
    layout() {
      // 登出
      this.$store.commit("CHANGETO_LOGOUT");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("user");
      if (this.$route.path === "/timeline" || this.$route.path === '/myCollections') {
        this.$router.push({ path: "/" });
        this.$store.commit('CHANGE_SELECTED', 0)
      }
      this.$http
        .post("/layout")
        .then(data => {
          window.location.reload()
        })
        .catch(err => console.log(err));
    },
    updateMenuList() {
      if(this.isLogin){
        this.menuList.splice(0,1,{text: "首页", href: '/timeline'})
        console.log(this.menuList);
      }else {
        this.menuList.splice(0,1, { text: "首页", href: '/home'})
      }
    }
  },
  computed: {
    ...mapGetters(["isLogin", "selected","menuList"])
  }
};
</script>
<style scoped>
@import url("../static/css/header.css");
</style>
