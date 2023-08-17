
import request from '@/utils/request'

// 获取图像验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}
// 获取短信验证码
export const getCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode: captchaCode,
      captchaKey: captchaKey,
      mobile: mobile
    }
  })
}
// 登录
export const login = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile: mobile,
      partyData: {},
      smsCode: smsCode
    }
  })
}
