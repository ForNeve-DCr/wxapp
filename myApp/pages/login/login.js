//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (!e.detail.userInfo) {
      return false;
    }
    wx.login({
      success: function (loginCode) {
        var appid = "wxb8257c0209bf5df6";
        var secret = "f3bc9912c1bf9bd537d09e3073c313b6";

        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
          success: function (res) {
            console.log(res.data.openid);
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        })
      }
    })
  },
  forgetPass: function(e) {
    wx.showToast({
      title: '点你妈了个锤子'
    })
  },
  login: function(e) {

  }
})
