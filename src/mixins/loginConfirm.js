import { Dialog } from 'vant'

export default {
  methods: {
    loginConfirm () {
      if (!this.$store.getters.token) {
        Dialog.confirm({
          title: '温馨提示',
          message: '此时要登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // on confirm
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel
          })
        return true
      }
      return false
    }
  }
}
