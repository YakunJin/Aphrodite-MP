// miniprogram/pages/productDetail/productDetail.js
Page({

  /**
   * Page initial data
   */
  data: {
    productInfo: {},
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getProductInfo',
      data: {
        productId: options.productId
      },
      success: res => {
        this.setData({
          productInfo: res.result.data || {}
        })
        wx.hideLoading();
        console.log(res.result.data)
      },
      fail: error => {
        wx.showToast({
          icon: 'none',
          title: '加载失败',
        });
        wx.hideLoading();
        console.error
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {
    return {
      title: '来看看我分享给你的款式',
      path: `/pages/productDetail/productDetail?productId=${this.data.productInfo._id}`,
      imageUrl: this.data.productInfo.image_path
    }
  }
})