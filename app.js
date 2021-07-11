// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: 'http://localhost:8082/app/appuser/login',
    //         data: {
    //           code: res.code
    //         },
    //         header: {
    //           'content-type': 'application/json' // 默认值
    //         },
    //         success(res) {
    //           console.log(res)
    //           wx.setStorageSync('token', res.data.token)
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null
  }
})