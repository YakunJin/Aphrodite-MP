// miniprogram/pages/clientApplication/clientApplication.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    clientInfo: null,
    inputPhoneNumber: '',
    isPolicyAgreed: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    app.logger.info(`[clientApplication] onload get client info ${JSON.stringify(app.globalData.clientInfo)}`)
    this.setData({
      clientInfo: app.globalData.clientInfo || null,
      inputPhoneNumber: app.globalData.clientInfo ? app.globalData.clientInfo.phone : ''
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

  doApplyClient: function() {
    wx.showLoading({
      title: '提交申请中'
    })
    this.applyClient({
      openId: app.globalData.openid,
      phone: this.data.inputPhoneNumber
    }).then(() =>{
      wx.showToast({
        title: '申请成功，请等待审核...',
        icon: 'success',
        duration: 2000
      })
      // wx.hideLoading()
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 2000)
    }).catch((err) =>{
      wx.showToast({
        title: '申请失败，请稍后重试.',
        duration: 2000
      })
      // wx.hideLoading()
      app.logger.error(`[clientApplication] apply client error ${JSON.stringify(err)}`)
    })
  },

  onInputPhoneNumber: function(e) {
    this.setData({
      inputPhoneNumber: e.detail.value
    })
  },

  onChangePolicyAgreement: function(e) {
    this.setData({
      isPolicyAgreed: !this.data.isPolicyAgreed
    })
  },

  applyClient: function({
    openId,
    phone,
    oper1_id,
    oper2_id,
    oper3_id
  }) {
    return new Promise((resolve, reject) => {
      let newClientInfo = {
        openId: openId,
        phone: phone,
        oper1_id: oper1_id,
        oper2_id: oper2_id,
        oper3_id: oper3_id,
      }
      wx.cloud.callFunction({
        name: 'applyClient',
        data: newClientInfo,
        success: res => {
          app.logger.info(`[clientApplication] apply client for user ${openId} phone:${phone}`)
          resolve(res)
        },
        fail: error => {
          app.logger.error(`[clientApplication] Error apply client info for user ${openId} ${error} `)
          reject(res)
        }
      })
    })
  },
})