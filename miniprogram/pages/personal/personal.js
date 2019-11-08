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
    clientInfo: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.setData({
      isUserInfoAquired: !!app.globalData.userInfo
    })
    if (this.data.isUserInfoAquired) {
      app.logger.info(`[personal] Get user info ${JSON.stringify(app.globalData.userInfo)}`)
      this.setData({
        personalInfo: app.globalData.userInfo
      })
    }

    if (!app.globalData.clientInfo) {
      this.getClientInfo();
    }
    app.globalData.clientInfo = this.data.clientInfo
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

  onClosePhoneBinderDialog: function(e) {
    if (e.detail) {
      app.globalData.clientInfo = e
      this.setData({
        clientInfo: e.detail
      })
    }
    
    this.setData({
      showPhoneBinderDialog: false,
    })
  },

  getClientInfo: function() {
    wx.showLoading({
      title: '加载中',
    })

    wx.cloud.callFunction({
      name: 'getClientInfo',
      data: {
        openId: app.globalData.openid
      },
      success: res => {
        this.setData({
          clientInfo: res.result.data[0] || null
        })
        wx.hideLoading();
        app.logger.info(`[phoneBinder] 调用客户信息接口成功 ${this.data.clientInfo}`)
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
  }
})