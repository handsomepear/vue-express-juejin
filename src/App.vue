<template>
  <div id="aap">
    <!-- 登录/注册 -->
    <div class="global-component-box">
      <div class="alert-list">
        <div class="alert" v-if="validateMsg">{{validateMsg}}</div>
      </div>
      <Login v-if="loginShow"></Login>
      <Register v-if="regShow"></Register>
    </div>
    <div class="view-container">
      <!-- start:头部 -->
      <myHeader></myHeader>
      <!-- end:头部 -->
      <!-- start:欢迎 -->
      <banner v-if='isHome'></banner>
      <!-- end:欢迎 -->
      <transition name="slide-down">
        <keep-alive>
          <router-view class="router-view"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
import myHeader from "./components/Header.vue";
import banner from "./components/Banner.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    myHeader,
    banner,
    Login,
    Register
  },
  mounted() {
    // 读取localStorage中的是否登录状态
    let isLogin = localStorage.getItem("isLogin");
    this.changeIsHome();
    if (isLogin) {
      // 页面加载之后判断是不是
      // 改变vuex中的isLogin的值
      this.$store.commit("CHANGETO_LOGIN");
      console.log(this.isHome);
      this.isHome ? this.$router.push({ path: "/timeline" }) : null;
    }
  },
  watch: {
    $route: "changeIsHome"
  },
  data() {
    return {
      timeonline: true,
      isHome: true
    };
  },
  methods: {
    ...mapActions(["CHANGETO_LOGIN"]),
    changeIsHome() {
      if (this.isLogin) {
        this.isHome = false;
      }
      if (!this.isLogin) {
        this.$route.fullPath === "/home"
          ? (this.isHome = true)
          : (this.isHome = false);
      }
    }
  },
  computed: {
    ...mapGetters(["loginShow", "regShow", "validateMsg", "isLogin"])
  }
};
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s cubic-bezier(0, 1.2, 1, 0.5);
  opacity: 0.7;
  transform: translate3d(0, 6em, 0);
}

.slide-down-enter,
.slide-down-leave-active {
  opacity: 0.1;
  transform: translate3d(0, 6em, 0);
}

.alert-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
}

.alert-list .alert {
  margin-bottom: 1rem;
}

.alert {
  display: inline-block;
  padding: 1rem 2rem;
  max-width: 15rem;
  font-size: 1.167rem;
  color: #007bff;
  background-color: #e6f3ff;
  box-shadow: 0 1 px 1 px 0 hsla(0, 0%, 80%, 0.5);
  border: 1px solid #b3d0ef;
  border-radius: 2px;
  cursor: default;
}
</style>