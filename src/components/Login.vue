<template>
  <div class="auth-modal-box">
    <form action="" class="auth-form">
      <div class="panfish">
        <img class="normal" src="https://gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" alt="">
      </div>
      <i data-v-6cb98ece="" title="关闭" class="close-btn ion-close-round" @click="LOGIN_HIDDEN"></i>
      <div class="panel">
        <h1 class="title">登录</h1>
        <div class="input-group">
          <div class="input-box">
            <input type="text" placeholder="邮箱/手机" v-model='phoneEmail' v-verify='phoneEmail' name="userInput">
          </div>
          <div class="input-box">
            <input type="password" placeholder="密码" v-model='password' v-verify='password' name="pwdInput">
          </div>

        </div>
        <button class="login-btn" @click.prevent="login">登录</button>
        <div class="prompt-box">
          没有账号？
          <span @click="showReg">注册</span>
          <a href="">忘记密码</a>
        </div>

      </div>
      <div class="oauth-box">
        第三方账号登陆：
        <img src="../static/images/weibo.fa758eb.svg" alt="weibo">
        <img src="../static/images/wechat.e0ff124.svg" alt="wechat">
        <img src="../static/images/github.547dd8a.svg" alt="github">
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Vue from "vue";
import verify from "vue-verify-plugin";
export default {
  mounted() {
    const imgUrl = {
        normal: "/static/images/normal.0447fe9.png",
        userFocus: "/static/images/greeting.1415c1c.png",
        pwdFocus: "/static/images/blindfold.58ce423.png"
      },
      shadow = document.querySelector(".auth-modal-box"),
      userInput = document.querySelector("input[name=userInput]"),
      pwdInput = document.querySelector("input[name=pwdInput]"),
      formAvatar = document.querySelector(".panfish img");
    // 隐藏
    userInput.focus();
    function hidden(...obj) {
      obj.forEach(item => {
        item.style.display = "none";
      });
    }
    // 显示
    function show(...obj) {
      obj.forEach(item => {
        item.style.display = "flex";
      });
    }

    userInput.addEventListener("focus", () => {
      formAvatar.src = imgUrl.userFocus;
    });
    pwdInput.addEventListener("focus", () => {
      formAvatar.src = imgUrl.pwdFocus;
    });
    // 两个同时失去焦点的时候
    userInput.addEventListener("blur", () => {
      formAvatar.src = imgUrl.normal;
    });
    pwdInput.addEventListener("blur", () => {
      formAvatar.src = imgUrl.normal;
    });
  },
  data() {
    return {
      phoneEmail: "",
      password: ""
    };
  },
  verify: {
    // 表单验证的配置
    phoneEmail: ["phoneEmailRequired", "phoneEmail"],
    password: ["pwdRequired", "pwd"]
  },
  methods: {
    ...mapActions(["LOGIN_HIDDEN", "UPDATE_MSG"]),
    showReg() {
      this.$store.dispatch("LOGIN_HIDDEN");
      this.$store.dispatch("REG_SHOW");
    },
    login() {
      var _this = this;
      var validateRet = this.$verify.check();
      if (!validateRet) {
        for (var error in this.$verify.$errors) {
          if (this.$verify.$errors[error].length != 0) {
            _this.$store.commit("UPDATE_MSG", this.$verify.$errors[error][0]);
            return false;
          }
        }
      } else {
        // 用axios发送登录请求 后台验证 验证不通过直接向vuex发送 '用户名或密码错误'
        var params = new URLSearchParams();
        params.append("phoneEmail", this.phoneEmail);
        params.append("password", this.password);
        params.append("return_url", "");
        this.$http.post("/login", params).then(data => {
          var data = data.data;
          if (data.code == 2000) {
            // 登陆成功
            localStorage.setItem("isLogin", true);
            localStorage.setItem("user", JSON.stringify(data.user));
            this.$store.commit("CHANGETO_LOGIN");
            console.log(this.$route.path);
            if (this.$route.path === "/home") {
              console.log(123);
              this.$router.push({ path: "/timeline" });
            }
            this.$store.commit("LOGIN_HIDDEN");
            window.location.reload()
          } else if (data.code == 2001) {
            // 手机号或者邮箱不存在
            this.$store.commit("UPDATE_MSG", "手机号或邮箱不存在");
          } else if (data.code == 2002) {
            // 密码错误
            this.$store.commit("UPDATE_MSG", "密码错误");
          } else if (data.code == 2004) {
            this.$store.commit("UPDATE_MSG", "服务器忙,请稍后重试");
          }
        });
      }
    }
  }
};
</script>

<style scoped>
@import "../static/css/ionicons.min.css";

.ion-close-round:before {
  display: inline-block;
  font-family: "Ionicons";
  /* speak: none; */
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-rendering: auto;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 12px;
  background-color: #f4f5f5;
}

body {
  overflow-y: scroll;
  overflow-x: hidden;
}

html,
body {
  width: 100%;
  height: 100%;
}

.panfish .normal {
  position: absolute;
  top: 0;
  left: 50%;
  width: 10rem;
  -webkit-transform: translate(-50%, -83%);
  transform: translate(-50%, -83%);
}

.auth-modal-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 500;
}

.auth-form {
  position: relative;
  width: 26.5rem;
  box-sizing: border-box;
  /*border: 1px solid #000;*/
  padding: 2rem;
  background-color: #fff;
}

.ion-close-round:before {
  content: "\f129";
}

.close-btn {
  float: right;
  cursor: pointer;
  opacity: 0.4;
}

.panel .title {
  margin: 0 0 2rem 0;
}

.panel .input-box {
  margin-bottom: 0.8rem;
}

.panel input {
  padding: 1rem;
  width: 100%;
  outline: none;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #e9e9e9;
}

.panel input:focus {
  border-color: #007fff;
}

.login-btn {
  width: 100%;
  outline: none;
  height: 3.334rem;
  background-color: #007fff;
  border-radius: 2px;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  color: #fff;
}

.prompt-box {
  margin: 1rem 0 0;
  color: #8b9196;
}

.prompt-box span {
  color: #007fff;
  cursor: pointer;
}

.prompt-box a {
  text-decoration: none;
  float: right;
  color: #007fff;
}

.oauth-box {
  margin-top: 2.3rem;
  font-size: 1rem;
  line-height: 1.9rem;
  color: #8b9196;
}

.oauth-box img {
  margin-left: 1.2rem;
  height: 1.9rem;
  vertical-align: bottom;
  cursor: pointer;
}
</style>
