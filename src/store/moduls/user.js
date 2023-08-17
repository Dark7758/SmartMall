import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 个人权证
      userinfo: getItem()
    }
  },
  mutations: {
    setUserinfo (state, obj) {
      state.userinfo = obj
      setItem(obj)
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserinfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}
