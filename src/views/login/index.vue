<template>
 <div class="login">
   <van-nav-bar
     title="会员登录"
     left-arrow
     @click-left="$router.go(-1)"
   />
   <div class="container">
     <div class="title">
       <h3>手机号登录</h3>
       <p>未注册的手机号登录后将自动注册</p>
     </div>

     <div class="form">
       <div class="form-item">
         <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="mobile">
       </div>
       <div class="form-item">
         <input class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model="captchaCode">
         <img :src="imgUrl" alt="" v-if="imgUrl" @click="getCaptchaCode">
       </div>
       <div class="form-item">
         <input class="inp" placeholder="请输入短信验证码" type="text" v-model="mobileKey">
         <button @click="getCode">{{ toltalSecond === second ? `获取验证码` : `${second}秒后重新发送`}}</button>
       </div>
     </div>

     <div class="login-btn" @click="login">登录</div>
   </div>
 </div>
</template>

<script>
import { getPicCode, getCode, login } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      captchaCode: '',
      captchaKey: '',
      imgUrl: '',
      mobile: '',
      mobileKey: '',
      toltalSecond: 60, // 总秒数
      second: 60, // 当前秒数
      timer: null // 定时器ID
    }
  },
  created () {
    this.getCaptchaCode()
  },
  methods: {
    // 获取图像验证码
    async getCaptchaCode () {
      const { data: { base64, key } } = await getPicCode()
      this.imgUrl = base64
      this.captchaKey = key
    },
    // 获取手机验证码
    async getCode () {
      if (!this.verify()) return
      if (!this.timer && this.toltalSecond === this.second) {
        // 发送请求，获取验证码
        const res = await getCode(this.captchaCode, this.captchaKey, this.mobile)
        // this.$toast(message)
        console.log(res)
        this.$notify({ type: 'success', message: `测试环境短信验证码:${res.message.substring(11)}` })
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.second = this.toltalSecond // 复位
            this.timer = null // 重启定时器
          }
        }, 1000)
      }
    },
    // 检验
    verify () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile.trim())) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.captchaCode.trim())) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 登录
    async login () {
      if (!this.verify()) return
      const res = await login(this.mobile, this.mobileKey)
      console.log(res)
      this.$store.commit('user/setUserinfo', res.data)
      this.$toast(res.message)
      const url = this.$route.query.backUrl || '/'
      await this.$router.replace(url)
    }
  },
  destroyed () {
    if (this.timer) clearInterval(this.timer)
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 93px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
