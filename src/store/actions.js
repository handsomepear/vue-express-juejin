import * as types from './mutations_type.js'


// 定义触发mutations函数
export default {
  LOGIN_SHOW({ commit }) {
    commit(types.LOGIN_SHOW)
  },
  LOGIN_HIDDEN({ commit }) {
    commit(types.LOGIN_HIDDEN)
  },
  REG_SHOW({ commit }) {
    commit(types.REG_SHOW)
  },
  REG_HIDDEN({ commit }) {
    commit(types.REG_HIDDEN)
  },
  UPDATE_MSG({ commit }) {
    commit(types.UPDATE_MSG)
  },
  CHANGETO_LOGIN({ commit }) {
    commit(types.CHANGETO_LOGIN)
  },
  CHANGETO_LOGOUT( {commit} ) {
    commit(types.CHANGETO_LOGOUT)
  },
  CHANGE_SELECTED({ commit }) {
    commit(types.CHANGE_SELECTED)
  }
}