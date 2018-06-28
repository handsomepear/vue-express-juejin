<template>
  <div class="auth-modal-box">
    <form action="" class="auth-form">
      <i data-v-6cb98ece="" title="关闭" class="close-btn ion-close-round" @click="REG_HIDDEN"></i>
      <div class="panel">
        <h1 class="title">注册</h1>
        <div class="input-group">
          <div class="input-box">
            <input type="text" placeholder="请输入用户名" v-model='username' v-verify='username' name="registerUsername">
          </div>
          <div class="input-box">
            <input type="text" placeholder="请填写手机号或邮箱" v-model='phoneEmail' v-verify='phoneEmail' name="registerPhoneOrEmail">
          </div>
          <div class="input-box">
            <input type="password" placeholder="请输入密码" v-model='password' v-verify='password' name="registerPassword">
          </div>

        </div>
        <button class="login-btn" @click.prevent="submit">注册</button>
        <div class="prompt-box center">
          <span @click="showLogin">已有账号登录</span>
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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      phoneEmail: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["validateMsg", "isLogin"])
  },
  verify: {
    // 表单验证的配置
    username: "usernameRequired",
    phoneEmail: ["phoneEmailRequired", "phoneEmail"],
    password: ["pwdRequired", "pwd"]
  },
  methods: {
    ...mapActions(["REG_HIDDEN", "CHANGETO_LOGIN", "REG_HIDDEN", "UPDATE_MSG"]),
    showLogin() {
      this.$store.dispatch("REG_HIDDEN");
      this.$store.dispatch("LOGIN_SHOW");
    },
    submit() {
      var _this = this;
      var validateRet = this.$verify.check(); // 获取验证结果
      // console.log(this.$verify.$errors); // 验证错误信息
      if (!validateRet) {
        // 前端表单验证未通过
        for (var error in this.$verify.$errors) {
          if (this.$verify.$errors[error].length != 0) {
            _this.$store.commit("UPDATE_MSG", this.$verify.$errors[error][0]);
            return false;
          }
        }
      } else {
        // 表单验证通过
        _this.$store.commit("UPDATE_MSG", "");
        // axios 处理post请求的参数问题
        var params = new URLSearchParams();
        params.append("username", this.username);
        params.append("phoneEmail", this.phoneEmail);
        params.append("password", this.password);
        this.$http
          .post("/register", params)
          .then(data => {
            var data = data.data;
            if (data.code == 1000 && data.user) {
              // 注册成功
              // 把登录状态保存到localstorage中(然后在APP.vue中读取isLogin的状态并且分发给vueux)
              // 应该还要保存用户信息
              localStorage.setItem("isLogin", true);
              localStorage.setItem("user", JSON.stringify(data.user));
              this.$router.push({ path: "/timeline" });
              this.$store.commit("CHANGETO_LOGIN");
              this.$store.commit("REG_HIDDEN");
              window.location.reload()
            } else if (data.code == 1001) {
              this.$store.commit("UPDATE_MSG", "用户名已存在");
            } else if (data.code == 1002) {
              this.$store.commit("UPDATE_MSG", "注册失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
.ion-close-round:before {
  display: inline-block;
  font-family: "Ionicons";
  speak: none;
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

.prompt-box.center {
  text-align: center;
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
