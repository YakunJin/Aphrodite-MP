// miniprogram/pages/personal/personal.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    isUserInfoAquired: false,
    personalInfo: {},
    showPhoneBinderDialog: false,
    clientInfo: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      isUserInfoAquired: !!app.globalData.userInfo
    })
    if (this.data.isUserInfoAquired) {
      app.logger.info(`[personal] Get user info ${JSON.stringify(app.globalData.userInfo)}`)
      this.setData({
        personalInfo: app.globalData.userInfo
      })
    }

    wx.cloud.callFunction({
      name: 'getClientInfo',
      data: {
        openId: app.globalData.openid
      },
      success: res => {
        this.setData({
          clientInfo: res.result.data[0]
        })
        wx.hideLoading();
        app.logger.info(`[phoneBinder] 获取客户信息成功 ${JSON.stringify(res.result.data)}`)
      },
      fail: error => {
        wx.showToast({
          icon: 'none',
          title: '加载失败',
        });
        wx.hideLoading();
        app.logger.error(`[phoneBinder] 获取客户信息失败 ${JSON.stringify(error)}`)
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },

  onBindPhone: function() {
    this.setData({
      showPhoneBinderDialog: true
    })
  },

  onPhoneBinderDialog: function() {
    this.setData({
      showPhoneBinderDialog: false
    })
  }
})