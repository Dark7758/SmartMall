import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/moduls/user'
import cart from '@/store/moduls/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    token (state) {
      return state.user.userinfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart
  }
})
