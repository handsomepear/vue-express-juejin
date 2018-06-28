import { LOGIN_SHOW, LOGIN_HIDDEN, REG_HIDDEN, REG_SHOW, UPDATE_MSG, CHANGETO_LOGIN, CHANGETO_LOGOUT,CHANGE_SELECTED } from './mutations_type.js'

// 定义状态
const state = {
  loginShow: false,
  regShow: false,
  validateMsg: '',
  isLogin: false,
  selected: 0, // header被选中的索引
  isHome: true
}

// 注册mutations
const mutations = {
  [LOGIN_SHOW](state) {
    state.loginShow = true
  },
  [LOGIN_HIDDEN](state) {
    state.loginShow = false
  },
  [REG_SHOW](state) {
    state.regShow = true
  },
  [REG_HIDDEN](state) {
    state.regShow = false
  },
  [UPDATE_MSG](state, msg) {
    state.validateMsg = msg
    setTimeout(function () {
      state.validateMsg = ''
    }, 5000)
  },
  [CHANGETO_LOGIN](state) {
    state.isLogin = true
  },
  [CHANGETO_LOGOUT](state){
    state.isLogin = false
  },
  [CHANGE_SELECTED](state, index) {
    state.selected = index
  }
}
// 定义getters
const getters = {
  loginShow(state) {
    return state.loginShow
  },
  regShow(state) {
    return state.regShow
  },
  validateMsg(state) {
    return state.validateMsg
  },
  isLogin(state) {
    return state.isLogin
  },
  selected(state) {
    return state.selected
  },
  isHome(state){
    return state.isHome
  }
}

export default {
  state,
  mutations,
  getters
}